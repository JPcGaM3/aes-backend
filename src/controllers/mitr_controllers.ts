import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { MitrService } from "../services/mitr_services";

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
      const authen = await MitrService.authen(token, password, username, email);
      if (!authen || authen.code !== 200) {
        return _res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Authentication failed.",
        });
      }
      const profile = await MitrService.getProfileAD(token, username, email);

      if (!profile || profile.code !== 200) {
        return _res.status(HTTP_STATUS.NOT_FOUND).json({
          status: "error",
          message: "Profile not found.",
        });
      }
      return _res.status(HTTP_STATUS.OK).json({
        status: "success",
        data: {
          token: token,
          authen_result: authen.result[0],
          profile_result: profile.result,
        },
      });
    } catch (error) {
      _next(error);
    }
  },
};
