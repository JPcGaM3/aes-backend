import { Router } from "express";
import { MitrController } from "../../controllers/mitr_controllers";

const mitrRouter = Router();

mitrRouter.get("/token", MitrController.getToken);
mitrRouter.post("/authen", MitrController.getAuthen);
mitrRouter.post("/profile", MitrController.getProfile);
mitrRouter.post("/profile/ad", MitrController.getProfileAD);
mitrRouter.post("/login", MitrController.getLogin);

export default mitrRouter;
