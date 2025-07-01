import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { RBACService } from "../services/rbac.service";

export const RBACController = {
  // ----- Role Management -----
  createRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, description, user_id } = req.body;

      const roleData = {
        name,
        description,
        created_by: Number(user_id),
        updated_by: Number(user_id),
      };

      const newRole = await RBACService.createRole(roleData);
      return res.status(HTTP_STATUS.CREATED).json(formatResponse(newRole));
    } catch (error) {
      next(error);
    }
  },

  getRoles: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { active } = req.query;
      const isActive = active !== undefined ? active === "true" : true;

      const roles = await RBACService.getRoles(isActive);
      return res.status(HTTP_STATUS.OK).json(formatResponse(roles));
    } catch (error) {
      next(error);
    }
  },

  // ----- Permission Management -----
  createPermission: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { resource, action, description, user_id } = req.body;

      const permissionData = {
        resource,
        action,
        description,
        created_by: Number(user_id),
        updated_by: Number(user_id),
      };

      const newPermission = await RBACService.createPermission(permissionData);
      return res
        .status(HTTP_STATUS.CREATED)
        .json(formatResponse(newPermission));
    } catch (error) {
      next(error);
    }
  },

  getPermissions: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { active } = req.query;
      const isActive = active !== undefined ? active === "true" : true;

      const permissions = await RBACService.getPermissions(isActive);
      return res.status(HTTP_STATUS.OK).json(formatResponse(permissions));
    } catch (error) {
      next(error);
    }
  },

  // ----- Role-Permission Management -----
  assignPermissionToRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { role_id, permission_id, user_id } = req.body;

      const rolePermission = await RBACService.assignPermissionToRole(
        Number(role_id),
        Number(permission_id),
        Number(user_id)
      );

      return res
        .status(HTTP_STATUS.CREATED)
        .json(formatResponse(rolePermission));
    } catch (error) {
      next(error);
    }
  },

  // ----- User-Role Management -----
  assignRoleToUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user_id, role_id, admin_id } = req.body;

      const userRole = await RBACService.assignRoleToUser(
        Number(user_id),
        Number(role_id),
        Number(admin_id)
      );

      return res.status(HTTP_STATUS.CREATED).json(formatResponse(userRole));
    } catch (error) {
      next(error);
    }
  },

  getUserRoles: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;

      const userRoles = await RBACService.getUserRoles(Number(id));
      return res.status(HTTP_STATUS.OK).json(formatResponse(userRoles));
    } catch (error) {
      next(error);
    }
  },
};
