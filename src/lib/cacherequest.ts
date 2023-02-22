import axios from "axios";
import ccxt from "ccxt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const axiosTimeout = 2000; //2sec

const getRequest = async (req: string) => {
  try {
    const response = await axios.get(req, { timeout: axiosTimeout });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

const makeCachedRequest = async (
  requestId: number,
  request: string,
  caching: boolean
) => {
  try {
    if (caching) {
      const connection = mysql.createConnection(
        process.env.DATABASE_URL_PRESALE
      );

      //let ttl = 3600000; //60min
      let ttl = 1800000; //30min
      const [ttls] = await connection
        .promise()
        .query(
          `SELECT * FROM cache_config WHERE requestId = ${requestId} LIMIT 1`
        );
      if (ttls.length) ttl = ttls[0].ttl;

      const [lists] = await connection
        .promise()
        .query(`SELECT * FROM cache WHERE request = '${request}' LIMIT 1`);
      if (!lists.length) {
        // If caching doesn't exist on DB
        //const response = await axios.get(request, { timeout: axiosTimeout });
        const response = await getRequest(request);

        if (response.success) {
          // Request success
          const str = JSON.stringify(response.data);
          const responseStr = Buffer.from(str).toString("base64");
          await connection
            .promise()
            .query(
              `INSERT INTO cache (request, response, timestamp, ttl) VALUES ('${request}', FROM_BASE64('${responseStr}'), ${Date.now()}, ${ttl});`
            );
          connection.end();
        }

        return response;
      }

      if (Date.now() - lists[0].timestamp > lists[0].ttl) {
        // If caching data is stale
        const response = await getRequest(request);

        if (response.success) {
          // Request success
          const str = JSON.stringify(response.data);
          const responseStr = Buffer.from(str).toString("base64");
          await connection
            .promise()
            .query(
              `UPDATE cache SET response = FROM_BASE64('${responseStr}'), timestamp = ${Date.now()}, ttl = ${ttl} WHERE id = ${
                lists[0].id
              };`
            );
          connection.end();
          return { success: true, data: response.data };
        }

        // Request failed with client error
        if (
          response?.error?.response?.status >= 400 &&
          response?.error?.response?.status <= 499
        ) {
          return { success: false, error: response.error };
        }
      }
      connection.end();
      return { success: true, data: JSON.parse(lists[0].response) };
    }

    // Caching is disabled
    const response = await getRequest(request);
    return response;
    /*const response = await axios.get(request);
    return { success: true, data: response.data };*/
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const makeCachedRequestForCcxt = async (
  exchange: any,
  symbol: any,
  timeRange: any,
  since: any,
  limit: any
) => {
  try {
    //get ttl
    const connection = mysql.createConnection(process.env.DATABASE_URL_PRESALE);

    let ttl = 3600000;
    const [ttls] = await connection
      .promise()
      .query(`SELECT * FROM cache_config WHERE requestId = 13 LIMIT 1`);
    if (ttls.length) ttl = ttls[0].ttl;

    //
    const request = `fetchOHLCV?exchange=${exchange}?symbol=${symbol}?time_range=${timeRange}?since=${since}?limit=${limit}`;
    const [lists] = await connection
      .promise()
      .query(`SELECT * FROM cache WHERE request = '${request}' LIMIT 1`);

    if (!lists.length) {
      //save cache
      // console.log("save ccxt cache");
      const exchangeEntity = new ccxt[exchange]({
        enableRateLimit: true,
      });

      if (exchangeEntity.has.fetchOHLCV) {
        const response = await exchangeEntity.fetchOHLCV(
          symbol,
          timeRange,
          since,
          limit
        );

        if (response) {
          await connection
            .promise()
            .query(
              `INSERT INTO cache (request, response, timestamp, ttl) VALUES (?, ?, ?, ?);`,
              [request, JSON.stringify(response), Date.now(), ttl]
            );
          connection.end();
          return response;
        }
        connection.end();
        return false;
      }
      connection.end();
      return false;
    }

    if (Date.now() - lists[0].timestamp > lists[0].ttl) {
      //update stale one
      // console.log("update ccxt cache");
      const exchangeEntity = new ccxt[exchange]({
        enableRateLimit: true,
      });
      if (exchangeEntity.has.fetchOHLCV) {
        const response = await exchangeEntity.fetchOHLCV(
          symbol,
          timeRange,
          since,
          limit
        );
        if (response) {
          await connection
            .promise()
            .query(
              `UPDATE cache SET response = ?, timestamp = ?, ttl = ? WHERE id = ?;`,
              [JSON.stringify(response), Date.now(), ttl, lists[0].id]
            );
          connection.end();
          return response;
        }
        connection.end();
        return false;
      }
      connection.end();
      return false;
    }

    //return cache
    // console.log("use ccxt cache");
    connection.end();
    return JSON.parse(lists[0].response);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default makeCachedRequest;
