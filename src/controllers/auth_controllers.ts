import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user_services";

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

export const loginUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = jwt.sign(
      { sub: req.body.username, iat: new Date().getTime() },
      process.env.SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(HTTP_STATUS.OK).json(
      formatResponse({
        token: token,
        username: req.body.username,
      })
    );
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json(
      formatResponse(null, {
        message: "Authentication failed",
      })
    );
  }
};

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET as string,
};

export const jwtAuth = new JwtStrategy(
  jwtOptions,
  async (payload: any, done: any) => {
    const user = await UserService.getByUsername(payload.sub);
    if (user) done(null, true);
    else done(null, false);
  }
);
