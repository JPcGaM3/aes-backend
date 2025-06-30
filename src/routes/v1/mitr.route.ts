import { Router } from "express";
import { MitrController } from "../../controllers/mitr.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const mitrRouter = Router();

mitrRouter.get("/token", AuthMiddleware, MitrController.getToken);
mitrRouter.post("/authen", AuthMiddleware, MitrController.getAuthen);
mitrRouter.post("/profile", AuthMiddleware, MitrController.getProfile);
mitrRouter.post("/profile/ad", AuthMiddleware, MitrController.getProfileAD);
mitrRouter.post("/login", AuthMiddleware, MitrController.getLogin);

export default mitrRouter;
