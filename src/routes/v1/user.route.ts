import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const userRouter = Router();

userRouter.get("/", AuthMiddleware, UserController.getAll);

userRouter.post("/register", AuthMiddleware, UserController.create);

userRouter.patch(":id/set/active", AuthMiddleware, UserController.setActive);

export default userRouter;
