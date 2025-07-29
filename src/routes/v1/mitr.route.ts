import { Router } from "express";
import { MitrController } from "../../controllers/mitr.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const mitrRouter = Router();

mitrRouter.get("/token", MitrController.getToken);
mitrRouter.post("/authen", MitrController.getAuthen);
mitrRouter.get("/profile", AuthMiddleware, MitrController.getProfile);
mitrRouter.get("/profile/ad", AuthMiddleware, MitrController.getProfileAD);
mitrRouter.post("/login", MitrController.getLogin);
mitrRouter.post("/logout", MitrController.logout);

mitrRouter.get("/refresh-token", AuthMiddleware, MitrController.refreshToken);

mitrRouter.get("/health", (req, res) => {
	res.status(200).json({ message: "AES Backend is working." });
});

export default mitrRouter;
