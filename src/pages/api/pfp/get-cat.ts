import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import * as AWS from "aws-sdk";
import { sessionOptions } from "../../../lib/session";
import APIResponse from "../../../lib/apiresponse";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";

const handler = nextConnect();

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

      const data = categories.map((item, index) => ({
        value: index,
        label: item.Prefix.replace("/", ""),
      }));

      res.json(APIResponse.success(data));
    } catch (error) {
      console.log(error);
      res.status(500).json(APIResponse.error(500, "Something goes wrong"));
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
