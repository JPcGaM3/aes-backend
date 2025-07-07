import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { UserService } from "../services/user.service";
import { AEAreaService } from "../services/ae_area.servive";
import { RoleEnum } from "../../generated/prisma";
import { RBACService } from "../services/rbac.service";

export const UserController = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = req.body;
      const user = await UserService.create({
        ...data,
        created_by: Number(data.user_id),
        updated_by: Number(data.user_id),
      });
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
      var { ae_id, role } = req.query;
      let roleArray: string[] = [];
      if (role) {
        if (Array.isArray(role)) {
          roleArray = role.map((r) => String(r));
        } else {
          roleArray = [String(role)];
        }
      }

      const role_res = await RBACService.getRoles();
      if (!role_res) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No roles found." }));
      }
      const role_id: number[] = [];
      roleArray.forEach((r: string) => {
        const foundRole = role_res.find((role) => role.name === r);
        if (foundRole) {
          role_id.push(foundRole.id);
        }
      });

      const users = await UserService.getAll(
        Number(ae_id),
        role_id.length > 0 ? role_id : undefined
      );
      if (!users || users.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No users found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(users));
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
  getOperationArea: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.currentUser;
      if (!id) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json(formatResponse([], { message: "Unauthorized" }));
      }
      const operationArea = await UserService.getOperationArea(id);
      if (!operationArea || operationArea.length <= 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Operation area not found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(operationArea));
    } catch (error) {
      next(error);
    }
  },

  getAEArea: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.currentUser;
      if (!id) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json(formatResponse([], { message: "Unauthorized" }));
      }
      const aeArea = await UserService.getAEArea(id);
      if (!aeArea || aeArea.length <= 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "AE area not found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(aeArea));
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
      const { active, user_id } = req.body;
      const updatedUser = await UserService.setActive(
        Number(id),
        active as boolean,
        Number(user_id)
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
