import { Router } from "express";
import { CarController } from "../../controllers/car.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const carRouter = Router();

carRouter.get("/", AuthMiddleware, CarController.getAll);
carRouter.patch("/:id/set/active", AuthMiddleware, CarController.setActive);

export default carRouter;
