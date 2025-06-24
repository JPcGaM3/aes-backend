import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { UserService } from "../services/user.service";
import { AEAreaService } from "../services/ae_area.servive";
import { RoleEnum } from "../../generated/prisma";

export const UserController = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.create(req.body);
      return res.status(HTTP_STATUS.CREATED).json(formatResponse(user));
    } catch (error) {
      next(error);
    }
  },

  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      var { ae, role } = req.query;
      if (role && typeof role === "string") {
        role = [role];
      }
      console.log(role);
      const ae_response = await AEAreaService.getAll();
      if (!ae_response || ae_response.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No ae found." }));
      }

      const users = await UserService.getAll(
        ae
          ? (ae_response.find((item: any) => item.name === ae).id as number)
          : undefined,
        role ? (role as RoleEnum[]) : undefined
      );
      if (!users || users.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
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
          let ae = ae_response.find((item: any) => item.id === user.ae_id).name;
          return {
            ...user,
            ae_name: ae,
          };
        })
      );
      return res.status(HTTP_STATUS.OK).json(formatResponse(enhancedUsers));
    } catch (error) {
      next(error);
    }
  },
  getByUsername: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const username = req.params.username;
    try {
      const user = await UserService.getByUsername(username);
      if (!user) {
        return res
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
        const ae = await AEAreaService.getById(user.ae_id as number);
        return {
          ...user,
          ae_name: ae?.name,
        };
      });
      return res.status(HTTP_STATUS.OK).json(formatResponse(enhancedUser));
    } catch (error) {
      next(error);
    }
  },
  setActive: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { is_active, updated_by } = req.body;
      const updatedUser = await UserService.setActive(
        Number(id),
        is_active,
        updated_by
      );
      if (!updatedUser) {
        return res
          .status(HTTP_STATUS.BADreqUEST)
          .json(
            formatResponse([], { message: "Failed to update user status." })
          );
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(updatedUser));
    } catch (error) {
      next(error);
    }
  },
};
