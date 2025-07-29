import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const userRouter = Router();

userRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("users", "READ"),
	UserController.getAll
);
userRouter.get(
	"/operation-area",
	AuthMiddleware,
	UserController.getOperationArea
);
userRouter.get("/ae-area", AuthMiddleware, UserController.getAEArea);

userRouter.post(
	"/register",
	AuthMiddleware,
	checkPermission("users", "CREATE"),
	UserController.create
);

userRouter.patch(
	":id/set/active",
	AuthMiddleware,
	checkPermission("users", "UPDATE"),
	UserController.setActive
);

export default userRouter;
