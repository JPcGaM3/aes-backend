import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { MitrService } from "../services/mitr_services";
import { CheckRole, CheckUnit } from "../utils/check_functions";
import { UserService } from "../services/user_services";

export const MitrController = {
  getToken: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const token = await MitrService.token();
      if (!token || !token.access_token) {
        return _res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "Failed to retrieve access token.",
        });
      }
      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: token,
      });
    } catch (error) {
      _next(error);
    }
  },
  getAuthen: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    const { token, username, email, password } = _req.body;
    try {
      const response = await MitrService.authen(
        token,
        username,
        email,
        password
      );
      if (!response || response.code !== 200) {
        return _res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Authentication failed.",
        });
      }
      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: { authen_result: response.result[0] },
      });
    } catch (error) {
      _next(error);
    }
  },
  getProfile: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    const { token, username, email } = _req.body;

    try {
      const profile = await MitrService.getProfile(token, username, email);

      if (!profile || profile.code !== 200) {
        return _res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }

      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      _next(error);
    }
  },
  getProfileAD: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    const { token, username, email } = _req.body;

    try {
      const profile = await MitrService.getProfileAD(token, username, email);

      if (!profile || profile.code !== 200) {
        return _res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }

      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: profile,
      });
    } catch (error) {
      _next(error);
    }
  },
  getLogin: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    const { username, email, password } = _req.body;
    try {
      var token = await MitrService.token();
      if (!token || !token.access_token) {
        return _res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "Failed to retrieve access token.",
        });
      }
      token = token.access_token;
      const authen = await MitrService.authen(
        token,
        password,
        username || null,
        email || null
      );
      if (!authen || authen.code !== 200) {
        return _res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Authentication failed.",
        });
      }

      //TODO: Have to change
      const profile = await MitrService.getProfile(
        token,
        "JetsadapornB",
        email || null
      );
      //   const profile = await MitrService.getProfile(
      //     token,
      //     username || null,
      //     email || null
      //   );

      if (!profile || profile.code !== 200) {
        return _res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }

      const user_exist = await UserService.getByUsername(username);

      if (!user_exist) {
        const userData = {
          username: username,
          email: authen.result[0].mail || null,
          fullname: profile.result[0].employeeName.th || null,
          role:
            CheckRole(
              profile.result[0].position.name.en ||
                profile.result[0].position.name.th
            ) || null,
          unit:
            CheckUnit(
              profile.result[0].position.name.en ||
                profile.result[0].position.name.th
            ) || null,
          active: true,
          created_by: 1,
          updated_by: 1,
        };

        const user_response = await UserService.create(userData);
        if (!user_response) {
          return _res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Failed to create user.",
          });
        }

        return _res.status(HTTP_STATUS.OK).json({
          status: "success",
          data: {
            token: token,
            user_result: user_response,
            authen_result: authen.result[0],
            profile_result: profile.result[0],
          },
        });
      }

      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: {
          token: token,
          user_result: user_exist,
          authen_result: authen.result[0],
          profile_result: profile.result[0],
        },
      });
    } catch (error) {
      _next(error);
    }
  },
};
