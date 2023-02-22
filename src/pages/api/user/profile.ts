import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url";
import nextConnect from "next-connect";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";
import { sessionOptions } from "../../../lib/session";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { sendEmail } from "../../../lib/send-email";
import { DAO } from "../../../lib/dao";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email, firstName, lastName, nickname, profileImage } = req.body;
      const connection = mysql.createConnection(process.env.DATABASE_URL);
      const response = await DAO.UserDAO.getUserDatabyId(req.session.user.id);
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });

      if (!response.data.length) {
        return res.status(404).json({
          success: false,
          error: "Account does not exist",
        });
      }

      const [account] = response.data;

      const updateFields = [];
      const updateData = [];

      let updateStr = `UPDATE users SET `;

      if (email) {
        const response_data = await DAO.UserDAO.getUserDatabyEmail(email);
        if (response_data.status == false)
          return res
            .status(403)
            .json({ success: false, error: "Can't get user_data" });

        if (response_data.data.length) {
          return res.status(400).json({
            success: false,
            error: "Email already in use",
          });
        }

        const { origin } = absoluteUrl(req);
        const token = uuidv4();
        const emailData = `
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title></title>
        </head>
        <body>
        To verify your email, please follow this link: <a href="${origin}/settings?code=${token}" target="_blank">Verify Email</a>
        </body>
        </html>`;

        await sendEmail(emailData, req.session.user.email);

        updateFields.push("temp_email = ?");
        updateData.push(email);

        updateFields.push("verification_code = ?");
        updateData.push(token);

        updateFields.push("token_expires = ?");
        updateData.push(addHours(new Date(), 2).getTime());
      }

      if (nickname) {
        const response_data = await DAO.UserDAO.getByNickName(nickname);
        if (response_data.data.length)
          return res.status(400).json({
            success: false,
            error: "Nickname is already in use",
          });

        updateFields.push("nickname = ?");
        updateData.push(nickname);
      }

      if (firstName) {
        updateFields.push("first_name = ?");
        updateData.push(firstName);
      }

      if (lastName) {
        updateFields.push("last_name = ?");
        updateData.push(lastName);
      }

      if (profileImage !== undefined) {
        updateFields.push("profile_picture = ?");
        updateData.push(profileImage);
      }

      if (!updateData.length) {
        return res.status(400).json({
          success: false,
          error: "Bad request",
        });
      }

      updateStr += updateFields.join(", ");

      updateStr += ` WHERE id = ?;`;

      await connection.promise().query(updateStr, [...updateData, account.id]);

      const response_data1 = await DAO.UserDAO.getUserDatabyId(
        req.session.user.id
      );
      if (response_data1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata by id" });
      const [users] = response_data1.data;

      const user = {
        email,
        id: users[0].id,
        caching: true,
        mfa: users[0].enable_mfa,
        subscriptionTier: users[0].subscription_tier,
        firstName: users[0].first_name,
        lastName: users[0].last_name,
        profileImage: users[0].profile_picture,
      };
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
