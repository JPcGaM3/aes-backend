import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../configs/constants";
import jwt from "jsonwebtoken";
import { MitrService } from "../services/mitr.service";
import { UserService } from "../services/user.service";
import { formatResponse } from "../utils/response_formatter";

export const MitrController = {
	getToken: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const token = await MitrService.token();
			if (!token || !token.access_token) {
				return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
					formatResponse([], {
						message: "Failed to retrieve access token.",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(token));
		} catch (error) {
			next(error);
		}
	},
	getAuthen: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { token, username, email, password } = req.body;

			if (!token) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Invalid token" }));
			}

			const response = await MitrService.authen(
				token,
				password,
				username,
				email
			);
			if (!response || response.code !== 200) {
				return res.status(HTTP_STATUS.UNAUTHORIZED).json(
					formatResponse([], {
						message: "Authentication failed.",
					})
				);
			}
			return res
				.status(HTTP_STATUS.OK)
				.json(formatResponse({ authenresult: response.result[0] }));
		} catch (error) {
			next(error);
		}
	},

	getProfile: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { token, username, email, id, role } = req.currentUser;

			if (!token || !(username && email) || !id) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized" }));
			}

			const profile = await MitrService.getProfile(token, username, email);

			if (!profile || profile.code !== 200) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "Profile not found." }));
			}

			const user = await UserService.getById(id);
			if (!user) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "User not found." }));
			}

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					profile: profile.result[0],
					user_result: { ...user, role: role },
				})
			);
		} catch (error) {
			next(error);
		}
	},

	getProfileAD: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { token, username, email, id, role } = req.currentUser;

			if (!token || !(username && email) || !id) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized" }));
			}

			const profile = await MitrService.getProfileAD(token, username, email);

			if (!profile || profile.code !== 200) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "Profile not found." }));
			}
			const user = await UserService.getById(id);
			if (!user) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "User not found." }));
			}

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					profile: profile.result[0],
					user_result: { ...user, role: role },
				})
			);
		} catch (error) {
			next(error);
		}
	},
	getLogin: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		const { ae_id } = req.query;
		const { username, email, password } = req.body;
		try {
			if (!(username || email) || !password) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Missing username, email or password",
					})
				);
			}

			if (!ae_id) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "Failed to retrieve AE area.",
					})
				);
			}

			const token = await MitrService.token();
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

			const profile = await MitrService.getProfile(
				userToken,
				username || null,
				email || null
			);

			if (!profile || profile.code !== 200) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "Profile not found.",
					})
				);
			}

			const user_exist = await UserService.getByEmployeeId(
				profile.result[0].id
			);

			if (!user_exist) {
				return res.status(HTTP_STATUS.UNAUTHORIZED).json(
					formatResponse([], {
						message: "Permission denied.",
					})
				);
			}

			const ae_areas: number[] = [];
			user_exist.user_ae_area.forEach((ae: any) => {
				ae_areas.push(Number(ae.ae_area.id));
			});

			if (!ae_areas.includes(Number(ae_id))) {
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

			const roles: string[] = [];
			user_exist.user_role.forEach((role: any) => {
				roles.push(role.role.name as string);
			});

			const currentUser = {
				token: userToken,
				id: userResponse.id,
				role: roles,
				unit: userResponse.unit,
				employee_id: profile.result[0].id,
				username: profile.result[0].username,
				email: authen.result[0].mail,
			};

			const jwtToken = jwt.sign(currentUser, process.env.JWT_SECRET as string, {
				algorithm: "HS256",
				expiresIn: "1h",
			});

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					token: jwtToken,
					id: userResponse.id,
					role: roles,
				})
			);
		} catch (error) {
			next(error);
		}
	},

	refreshToken: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const token = req.headers.authorization?.replace("Bearer ", "");

			if (!token) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized" }));
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
				algorithms: ["HS256"],
			});
			if (!decoded || typeof decoded !== "object") {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Token expired or invalid." }));
			}
			const { id, role, unit, employee_id, username, email } = decoded as any;

			const mitrToken = await MitrService.token();
			if (!mitrToken || !mitrToken.access_token) {
				return res.status(HTTP_STATUS.UNAUTHORIZED).json(
					formatResponse([], {
						message: "Failed to retrieve access token.",
					})
				);
			}

			const currentUser = {
				token: mitrToken.access_token,
				id: id,
				role: role,
				unit: unit,
				employee_id: employee_id,
				username: username,
				email: email,
			};

			const jwtToken = jwt.sign(currentUser, process.env.JWT_SECRET as string, {
				algorithm: "HS256",
				expiresIn: "1h",
			});

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					token: jwtToken,
				})
			);
		} catch (error) {
			next(error);
		}
	},
	logout: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			return res
				.status(HTTP_STATUS.OK)
				.json(formatResponse({ message: "Logout successful." }));
		} catch (error) {
			next(error);
		}
	},
};
