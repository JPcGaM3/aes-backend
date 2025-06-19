import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { UserService } from "../services/user_services";
import { AEService } from "../services/ae_servives";

export const UserController = {
  create: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.create(_req.body);
      return _res.status(HTTP_STATUS.CREATED).json(formatResponse(user));
    } catch (error) {
      _next(error);
    }
  },

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
      const enhancedUsers = await Promise.all(
        users.map(async (user) => {
          if (!user.ae_id) {
            return {
              ...user,
              ae_name: null,
            };
          }
          const ae = await AEService.getById(user.ae_id as number);
          return {
            ...user,
            ae_name: ae?.name,
          };
        })
      );
      return _res.status(HTTP_STATUS.OK).json(formatResponse(enhancedUsers));
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
      const enhancedUser = await Promise.resolve(async () => {
        if (!user.ae_id) {
          return {
            ...user,
            ae_name: null,
          };
        }
        const ae = await AEService.getById(user.ae_id as number);
        return {
          ...user,
          ae_name: ae?.name,
        };
      });
      return _res.status(HTTP_STATUS.OK).json(formatResponse(enhancedUser));
    } catch (error) {
      _next(error);
    }
  },
};
