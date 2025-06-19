import passport from "passport";
import { Router } from "express";
import { jwtAuth } from "../../controllers/auth_controllers";
import { UserController } from "../../controllers/user_controllers";

// passport.use(jwtAuth);

const userRouter = Router();
// const requireJWTAuth = passport.authenticate("jwt", { session: false });

userRouter.get("/", UserController.getAll);
userRouter.post("/register", UserController.create);

export default userRouter;
