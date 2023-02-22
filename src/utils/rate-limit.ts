import rateLimit from "express-rate-limit";
// import slowDown from "express-slow-down";
import { NextApiRequest, NextApiResponse } from "next";

export const ERROR_MANY_REQUESTS = "Too many requests";
export const CODE_MANY_REQUESTS = 429;

const applyMiddleware = (middleware) => (request, response) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });

const getIP = (request) =>
  request.ip ||
  request.headers["x-forwarded-for"] ||
  request.headers["x-real-ip"] ||
  request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
  limit = 10,
  windowMs = 60 * 1000,
  // delayAfter = Math.round(10 / 2),
  // delayMs = 500,
} = {}) => [
  // slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares({
  limit: 70,
  // delayAfter: 60,
  // delayMs: 1000,
});

async function applyRateLimit(request, response) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map((middleware) => middleware(request, response))
  );
}

export const applyRateLimitMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  try {
    await applyRateLimit(req, res);
    return next();
  } catch {
    return res
      .status(CODE_MANY_REQUESTS)
      .json({ success: false, error: ERROR_MANY_REQUESTS });
  }
};

export default applyRateLimit;
