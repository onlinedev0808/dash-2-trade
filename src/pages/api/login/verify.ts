import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { DAO } from "../../../lib/dao";
// import Dao from "../../../services/db/Dao";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");
// var ObjectId = require("mongodb").ObjectId;

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { code } = req.body;

      const response = await DAO.UserDAO.getUserByVerifyCode(code);
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });
      if (!response.data.length) {
        // connection.end();
        return res.status(404).json({
          success: false,
          error: "Account does not exist",
        });
      }

      const [account] = response.data;

      // await collection.updateOne(
      //   { _id: ObjectId(account._id) },
      //   { $set: { accountVerified: true }, $unset: { verificationCode: "" } }
      // );

      // await connection
      //   .promise()
      //   .query(
      //     `UPDATE users SET account_verified = ?, verification_code = ? WHERE id = ?;`,
      //     [true, "", account.id]
      //   );
      // connection.end();

      const response_data = await DAO.UserDAO.updateVerifyCode(
        true,
        "",
        account.id
      );
      if (response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Update verifyCode failure" });
      else return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default handler;
