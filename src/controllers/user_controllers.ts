import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { UserService } from "../services/user_services";

export const UserController = {
  getAll: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const users = await UserService.getAll();
      if (!users || users.length === 0) {
        return _res
          .status(HTTP_STATUS.OK)
          .json(formatResponse([], { message: "No users found." }));
      }
      return _res.status(HTTP_STATUS.OK).json(formatResponse(users));
    } catch (error) {
      _next(error);
    }
  },
  getByUsername: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    const username = _req.params.username;
    try {
      const user = await UserService.getByUsername(username);
      if (!user) {
        return _res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse(null, { message: "User not found." }));
      }
      return _res.status(HTTP_STATUS.OK).json(formatResponse(user));
    } catch (error) {
      _next(error);
    }
  },
};
