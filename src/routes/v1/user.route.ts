import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const userRouter = Router();

userRouter.get("/", AuthMiddleware, UserController.getAll);
userRouter.get(
  "/operation-area",
  AuthMiddleware,
  UserController.getOperationArea
);
userRouter.get("/ae-area", AuthMiddleware, UserController.getAEArea);

userRouter.post("/register", AuthMiddleware, UserController.create);

userRouter.patch(":id/set/active", AuthMiddleware, UserController.setActive);

export default userRouter;
