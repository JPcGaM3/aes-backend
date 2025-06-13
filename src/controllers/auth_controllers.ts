import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import jwt from "jsonwebtoken";

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

export const loginUsername = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  try {
    const token = jwt.sign(
      { sub: _req.body.username, iat: new Date().getTime() },
      process.env.SECRET as string,
      { expiresIn: "1h" }
    );
    _res.status(HTTP_STATUS.OK).json(
      formatResponse({
        token: token,
        username: _req.body.username,
      })
    );
  } catch (error) {
    _res.status(HTTP_STATUS.UNAUTHORIZED).json(
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
  (payload: any, done: any) => {
    //TODO: Have to change in the future
    if (payload.sub === "admin") done(null, true);
    else done(null, false);
  }
);
