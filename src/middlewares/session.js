import { handleHttpError } from "../errors/handleError.js"
import { tokenVerify } from "../utils/handleJWT.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const headerToken =  req.headers.Authorization;
    if (!headerToken || !headerToken.startsWith("Bearer ")) {
      handleHttpError(res, "ERROR_AUTH_MIDDLEWARE", "No Bearer token provided", { status: 401 });
      return;
    }
    const token = headerToken.replace("Bearer ", "").trim();
    if (!token) {
      handleHttpError(res, "ERROR_AUTH_MIDDLEWARE", "Invalid token format", { status: 401 });
      return;
    }

    const dataToken = await verifyToken(token);

    if (!dataToken?.id) {
      handleHttpError(res, "ERROR_AUTH_MIDDLEWARE", "Invalid token data", { status: 401 });
      return;
    }
    // Optionally, attach user info to req
    req.user = dataToken;
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", error);
  }
};