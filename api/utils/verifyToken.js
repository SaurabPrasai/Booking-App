import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

const checkToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(404, "You are not authenticated"));
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
      return next(errorHandler(404, "The token is invalid"));
    }
    req.user = user;
    return user;
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const user = checkToken(req, res, next);
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyUser = (req, res, next) => {
  try {
    const user = checkToken(req, res, next);
    //   admin too added
    if (user) {
      if (req.user.id === req.params.id) {
        return next();
      } else {
        return next(errorHandler(403, "You are not authenticated"));
      }
    }
  } catch (error) {
    next(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    checkToken(req, res, next);
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      return next(errorHandler(403, "You are not authenticated"));
    }
  } catch (error) {
    next(error);
  }
};
