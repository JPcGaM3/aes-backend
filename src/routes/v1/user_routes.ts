import passport from "passport";
import { Router } from "express";
import { jwtAuth } from "../../controllers/auth_controllers";
import { UserController } from "../../controllers/user_controllers";

passport.use(jwtAuth);

const userRouter = Router();
const requireJWTAuth = passport.authenticate("jwt", { session: false });

userRouter.get("/", requireJWTAuth, UserController.getAll);

export default userRouter;
