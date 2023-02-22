import { NextApiRequest, NextApiResponse } from "next";

export const CODE_FORBIDDEN = 403;
export const ERROR_FORBIDDEN = "Forbidden";

export const applyAuthMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  try {
    const user = req.session?.user;

    if (!user) {
      return res
        .status(CODE_FORBIDDEN)
        .json({ success: false, error: ERROR_FORBIDDEN });
    }

    return next();
  } catch {
    return res
      .status(CODE_FORBIDDEN)
      .json({ success: false, error: ERROR_FORBIDDEN });
  }
};
