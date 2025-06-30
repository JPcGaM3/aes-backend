import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import jwt from "jsonwebtoken";
import { MitrService } from "../services/mitr.service";
import { UserService } from "../services/user.service";
import { formatResponse } from "../utils/response_formatter";
import { users } from "../../generated/prisma";

export const MitrController = {
  getToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const token = await MitrService.token();
      if (!token || !token.access_token) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "Failed to retrieve access token.",
        });
      }
      return res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: token,
      });
    } catch (error) {
      next(error);
    }
  },
  getAuthen: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { token, username, email, password } = req.body;
    try {
      const response = await MitrService.authen(
        token,
        username,
        email,
        password
      );
      if (!response || response.code !== 200) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Authentication failed.",
        });
      }
      return res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: { authenresult: response.result[0] },
      });
    } catch (error) {
      next(error);
    }
  },
  getProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { token, username, email } = req.body;

    try {
      const profile = await MitrService.getProfile(token, username, email);

      if (!profile || profile.code !== 200) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  },
  getProfileAD: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { token, username, email } = req.body;

    try {
      const profile = await MitrService.getProfileAD(token, username, email);

      if (!profile || profile.code !== 200) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  },
  getLogin: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { username, email, password } = req.body;
    try {
      var token = await MitrService.token();
      if (!token || !token.access_token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(
          formatResponse([], {
            message: "Failed to retrieve access token.",
          })
        );
      }
      const userToken = token.access_token;
      const authen = await MitrService.authen(
        userToken,
        password,
        username || null,
        email || null
      );
      if (!authen || authen.code !== 200) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(
          formatResponse([], {
            message: "Authentication failed.",
          })
        );
      }

      //TODO: Have to change
      const profile = await MitrService.getProfile(
        userToken,
        "JetsadapornB",
        email || null
      );
      //   const profile = await MitrService.getProfile(
      //     token,
      //     username || null,
      //     email || null
      //   );

      if (!profile || profile.code !== 200) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse([], {
            message: "Profile not found.",
          })
        );
      }

      const user_exist = await UserService.getByEmployeeId(
        //TODO: Change!
        // profile.result[0].id
        "Test"
      );

      if (!user_exist) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(
          formatResponse([], {
            message: "Permission denied.",
          })
        );
      }

      const userData = {
        username: username,
        email: authen.result[0].mail || null,
        fullname: profile.result[0].employeeName.th || null,
        updated_by: user_exist.id,
      };

      const userResponse = await UserService.update(user_exist.id, userData);

      if (!userResponse) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
          formatResponse([], {
            message: "Failed to update user.",
          })
        );
      }

      const currentUser: users & { token: string } = {
        ...userResponse,
        token: userToken,
        employee_id: profile.result[0].id,
        username: profile.result[0].username,
        email: authen.result[0].mail,
        fullname: profile.result[0].employeeName.th,
        role: userResponse.role,
        ae_id: Number(userResponse.ae_id),
      };

      const jwtToken = jwt.sign(currentUser, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse({
          token: jwtToken,
          // token: userToken,
          user_result: userResponse,
          authen_result: authen.result[0],
          profile_result: profile.result[0],
        })
      );
    } catch (error) {
      next(error);
    }
  },
};
