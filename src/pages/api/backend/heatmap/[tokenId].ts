import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import makeCachedRequest from "../../../../lib/cacherequest";
import { sessionOptions } from "../../../../lib/session";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";

const handler = nextConnect();

const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { tokenId } = req.query;
      const response = await makeCachedRequest(
        4,
        `https://d2t.info/tokens/${tokenId}/volumes/heatmap`,
        req.session.user?.caching
      );
      const result = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 4; hour <= 24; hour += 4) {
          const data = response.data.filter(
            (dayData) => dayData.day === weekday[day]
          )[0];
          let volume = 0;
          if (data && data.data[hour - 1]) {
            volume = data.data[hour - 1].value;
          }
          result.push({
            day,
            hour,
            volume,
          });
        }
      }
      // response.data.forEach((dayData) => {
      //   let day = weekday[dayData.day];
      //   for (let hour = 3; hour <= 23; hour += 4) {
      //     if (dayData.data[hour]) {
      //       result.push({
      //         day,
      //         hour: hour + 1,
      //         volume: dayData.data[hour].value
      //       });
      //     }
      //   }
      // });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
