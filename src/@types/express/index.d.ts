import { users } from "../../../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      currentUser: users & { token: string };
    }
  }
}

export {};
