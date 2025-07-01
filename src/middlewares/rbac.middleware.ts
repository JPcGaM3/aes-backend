import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import prisma from "./prisma.middleware";
import { Request, Response, NextFunction } from "express";

// Cache for permissions to reduce database queries
let permissionsCache: { [key: string]: boolean } = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cacheTimestamp = Date.now();

// Helper to clear cache when TTL expires
const checkAndClearCache = () => {
  if (Date.now() - cacheTimestamp > CACHE_TTL) {
    permissionsCache = {};
    cacheTimestamp = Date.now();
  }
};

// Function to check if user has permission for an action on a resource
export const hasPermission = async (
  userId: number,
  resource: string,
  action: string
): Promise<boolean> => {
  checkAndClearCache();

  const cacheKey = `${userId}:${resource}:${action}`;

  // Return from cache if available
  if (permissionsCache[cacheKey] !== undefined) {
    return permissionsCache[cacheKey];
  }

  // Query the database for permissions
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

  // Check if any role has the required permission
  const hasAccess = userPermissions.some((user_role) =>
    user_role.role?.permissions.some(
      (rp: any) =>
        rp.permission.resource === resource && rp.permission.action === action
    )
  );

  // Cache the result
  permissionsCache[cacheKey] = hasAccess;

  return hasAccess;
};

// Express middleware for checking permissions
export const checkPermission = (resource: string, action: string): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Ensure user is authenticated and user_id is available
    // const userId = req.body.user_id || req.currentUser.id;
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
