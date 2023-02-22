import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler.use(applyAuthMiddleware).use(applyRateLimitMiddleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.session.user) return res.status(200).json("");
    const connection = mysql.createConnection(process.env.DATABASE_URL);

    const delimiter = ":::";

    const {
      start,
      end,
      page = 0,
      desc = true,
      limit = 2,
      tags = "",
    } = req.query;

    const offset = +limit * +page;

    /*let where = `m.type_id = 3`;

    if (start && end) {
      where += ` AND m.timestamp between ${+start} and ${+end}`;
    }

    if (tags) {
      where += ` AND ti.tag_id IN (${tags})`;
    }

    const innerJoin = tags
      ? "INNER JOIN tag_item AS ti ON ti.item_id = m.id"
      : "";

    const offsetQuery = offset ? `OFFSET ${+offset}` : "";

    const subQuery = `SELECT GROUP_CONCAT(t.title , '${delimiter}', t.color, '${delimiter}', t.type SEPARATOR ';') FROM tag_item AS i INNER JOIN tag AS t ON t.id=i.tag_id where item_id=m.id`;
    const subQueryLikes = `SELECT COUNT(*) FROM message_likes AS ml where ml.item_id=m.id AND ml.is_like=1`;
    const query = `SELECT DISTINCT m.*, (${subQuery}) AS tags, (${subQueryLikes}) as likes
                    FROM messages AS m 
                    ${innerJoin} 
                    WHERE ${where} 
                    ORDER BY m.timestamp ${desc === "true" ? "DESC" : "ASC"} 
                    LIMIT ${+limit} ${offsetQuery};`;

    */

    const where = [];
    if (start && end) {
      where.push(`e.timestamp between ${+start} and ${+end}`);
    }

    if (tags) {
      const tagQuery = (tags as string)
        .split(",")
        .map(
          (id) =>
            `e.tags LIKE '[${id},%' OR e.tags LIKE '%,${id},%' OR e.tags LIKE '%,${id}]'`
        );

      where.push(`(${tagQuery.join(" OR ")})`);
    }

    const offsetQuery = offset ? `OFFSET ${+offset}` : "";

    //SUBSTRING_INDEX(SUBSTRING_INDEX(e.tags, '[', -1), ']', 1) AS tag_ids
    const subQuery = `SELECT GROUP_CONCAT(t.title , '${delimiter}', t.color, '${delimiter}', t.type SEPARATOR ';') FROM tag AS t WHERE e.tags LIKE CONCAT('%,', t.id, ',%') OR e.tags LIKE CONCAT('[', t.id, ',%') OR e.tags LIKE CONCAT('%,',t.id, ']')`;
    const subQueryLikes = `SELECT COUNT(*) FROM message_likes AS l where l.item_id=e.id AND l.is_like=1`;
    const query = `SELECT e.*, e.tags AS tag_ids, (${subQueryLikes}) as likes, (${subQuery}) AS tags
                   FROM events AS e
                   ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
                   ORDER BY e.timestamp ${
                     desc === "true" ? "DESC" : "ASC"
                   }, e.id DESC
                   LIMIT ${+limit} ${offsetQuery};`;

    const [result] = await connection.promise().query(query);

    const messages = result?.map((event) => {
      const tagList = event.tags?.split(";");
      const tags = tagList?.map((entry) => entry.split(delimiter));

      return { ...event, tags };
    });

    connection.end();
    return res.status(200).json(messages ?? []);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

export default withIronSessionApiRoute(handler, sessionOptions);
