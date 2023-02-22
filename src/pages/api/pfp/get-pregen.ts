import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import * as AWS from "aws-sdk";
import { sessionOptions } from "../../../lib/session";
import APIResponse from "../../../lib/apiresponse";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";

// eslint-disable-next-line @typescript-eslint/no-var-requires
var mysql = require("mysql2");

const handler = nextConnect();

const BASE_URL = "https://s3.amazonaws.com/dash2-pfp-pregenerated/";

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      //Create S3 client and get all categories
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "us-east-1",
        signatureVersion: "v4",
      });

      const result = await s3
        .listObjectsV2({
          Bucket: process.env.S3_BUCKET,
          Delimiter: "/",
        })
        .promise();
      const categories = result.CommonPrefixes;

      const { category } = req.query;
      const ca = categories[Number(category)];

      //For invalid category number
      if (!ca)
        return res.status(404).json(APIResponse.error(404, "Invalid category"));

      const options = {
        Bucket: process.env.S3_BUCKET,
        Prefix: ca.Prefix,
      };

      //Get all images in a category
      let allKeys = [];
      const listAllKeys = async (opts) => {
        const opt = { ...opts };
        do {
          // eslint-disable-next-line
          const data = await s3.listObjectsV2(opt).promise();
          opt.ContinuationToken = data.NextContinuationToken;
          allKeys = allKeys.concat(data.Contents);
        } while (opt.ContinuationToken);
      };
      await listAllKeys(options);

      //Get images registered
      const connection = mysql.createConnection(process.env.DATABASE_URL);
      const [lists] = await connection
        .promise()
        .query("SELECT profile_picture from users");
      const dbLists = lists
        .filter((item: any) => item.profile_picture)
        .map((item: any) => item.profile_picture);

      //Remove images already registered
      const urls = allKeys.filter(
        (item) => !dbLists.includes(BASE_URL + item.Key)
      );

      //Return 404error if category has no image
      if (!urls.length)
        return res
          .status(404)
          .json(APIResponse.error(404, "No available image for this category"));

      //Return random image url
      const ranIndex = Math.floor(Math.random() * urls.length);
      const url = urls[ranIndex].Key;

      res.json(APIResponse.success(BASE_URL + url));
    } catch (error) {
      console.log(error);
      res.status(500).json(APIResponse.error(500, "Something goes wrong"));
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
