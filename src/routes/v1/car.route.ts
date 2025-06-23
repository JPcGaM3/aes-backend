import { Router } from "express";
import { CarController } from "../../controllers/car.controller";

const carRouter = Router();

carRouter.get("/", CarController.getAll);

export default carRouter;
