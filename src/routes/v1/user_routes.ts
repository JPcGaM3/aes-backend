import passport from "passport";
import { getUsers } from "../../controllers/user_controllers";
import { Router } from "express";
import { jwtAuth } from "../../controllers/auth_controllers";

passport.use(jwtAuth);

const userRouter = Router();
const requireJWTAuth = passport.authenticate("jwt", { session: false });

userRouter.get("/", requireJWTAuth, getUsers);

export default userRouter;
