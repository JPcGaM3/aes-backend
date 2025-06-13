import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { UserService } from "../services/user_services";

export const getUsers = async (
  _req: Request,
  _res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const users = await UserService.getAll();
    if (!users || users.length === 0) {
      _res
        .status(HTTP_STATUS.OK)
        .json(formatResponse([], { message: "No users found." }));
      return;
    }
    _res.status(HTTP_STATUS.OK).json(formatResponse(users));
  } catch (error) {
    _next(error);
  }
};
