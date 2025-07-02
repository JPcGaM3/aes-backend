import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import prisma from "./prisma.middleware";
import { Request, Response, NextFunction } from "express";

let permissionsCache: { [key: string]: boolean } = {};
const CACHE_TTL = 5 * 60 * 1000;
let cacheTimestamp = Date.now();

const checkAndClearCache = () => {
  if (Date.now() - cacheTimestamp > CACHE_TTL) {
    permissionsCache = {};
    cacheTimestamp = Date.now();
  }
};

export const hasPermission = async (
  userId: number,
  resource: string,
  action: string
): Promise<boolean> => {
  checkAndClearCache();

  const cacheKey = `${userId}:${resource}:${action}`;

  if (permissionsCache[cacheKey] !== undefined) {
    return permissionsCache[cacheKey];
  }

  const userPermissions = await prisma.user_role.findMany({
    where: { user_id: userId },
    select: {
      role: {
        select: {
          permissions: {
            select: {
              permission: {
                select: {
                  resource: true,
                  action: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const hasAccess = userPermissions.some((user_role) =>
    user_role.role?.permissions.some(
      (rp: any) =>
        rp.permission.resource === resource && rp.permission.action === action
    )
  );

  permissionsCache[cacheKey] = hasAccess;

  return hasAccess;
};

export const checkPermission = (resource: string, action: string): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.currentUser;

    if (!id) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(
          formatResponse([], { message: "Unauthorized: No user ID provided" })
        );
    }

    try {
      const permitted = await hasPermission(Number(id), resource, action);

      if (!permitted) {
        return res.status(HTTP_STATUS.FORBIDDEN).json(
          formatResponse([], {
            message: `Forbidden: You don't have permission to ${action} ${resource}`,
          })
        );
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        formatResponse([], {
          message: "Internal server error during permission check",
        })
      );
    }
  };
};
