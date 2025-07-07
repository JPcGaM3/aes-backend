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
			const { username, email, password } = req.body;
			const { token } = req.currentUser;

			if (!token) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized" }));
			}

			const response = await MitrService.authen(
				token,
				username,
				email,
				password
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
			const { token, username, email, id } = req.currentUser;

			if (!token || !(username && email) || !id) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized" }));
			}

			var profile = await MitrService.getProfile(token, username, email);

			//TODO: Test Only
			if (email === "L.Kritsada@mitrphol.com") {
				profile = await MitrService.getProfile(
					token,
					"JetsadapornB",
					undefined
				);
			}

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

			const roles: string[] = [];
			user.user_role.forEach((role: any) => {
				roles.push(role.role.name as string);
			});

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					profile: profile.result[0],
					user_result: { ...user, role: roles },
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
			const { token, username, email, id } = req.currentUser;

			if (!token || !(username && email) || !id) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "Unauthorized" }));
			}

			var profile = await MitrService.getProfileAD(token, username, email);

			//TODO: Test Only
			if (email === "L.Kritsada@mitrphol.com") {
				profile = await MitrService.getProfileAD(
					token,
					"JetsadapornB",
					undefined
				);
			}

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

			const roles: string[] = [];
			user.user_role.forEach((role: any) => {
				roles.push(role.role.name as string);
			});

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					profile: profile.result[0],
					user_result: { ...user, role: roles },
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

			var profile = await MitrService.getProfile(
				userToken,
				username || null,
				email || null
			);

			//TODO: Test Only
			if (username === "L.Kritsada") {
				profile = await MitrService.getProfile(
					userToken,
					"JetsadapornB",
					email || null
				);
			}

			if (!profile || profile.code !== 200) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "Profile not found.",
					})
				);
			}

			//TODO: Change to const
			var user_exist = await UserService.getByEmployeeId(profile.result[0].id);

			//TODO: Test Only
			if (username === "L.Kritsada") {
				user_exist = await UserService.getByEmployeeId("Test");
			}

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

			if (!(Number(ae_id) in ae_areas)) {
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
				ae_id: Number(userResponse.ae_id),
				role: userResponse.role,
				unit: userResponse.unit,
				employee_id: profile.result[0].id,
				username: profile.result[0].username,
				email: authen.result[0].mail,
			};

			const jwtToken = jwt.sign(currentUser, process.env.JWT_SECRET as string, {
				expiresIn: "1h",
			});

			return res.status(HTTP_STATUS.OK).json(
				formatResponse({
					token: jwtToken,
					id: userResponse.id,
					role: roles,
					// user_result: userResponse,
					// authen_result: authen.result[0],
					// profile_result: profile.result[0],
				})
			);
		} catch (error) {
			next(error);
		}
	},
};
