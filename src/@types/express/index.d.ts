import { users } from "../../../generated/prisma";

interface CurrentUser {
	token: string | null;
	id: number | NaN;
	role?: string[] | null;
	unit: number | NaN;
	employee_id: string | null;
	username: string | null;
	email: string | null;
}
declare global {
	namespace Express {
		interface Request {
			currentUser: CurrentUser;
		}
	}
}

export {};
