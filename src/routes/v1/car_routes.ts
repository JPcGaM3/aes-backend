import { Router } from "express";
import {
  getCars,
  getCar,
  createNewCar,
  updateExistingCar,
  deleteExistingCar,
} from "../../controllers/car_controllers";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCar);
carRouter.post("/", createNewCar);
carRouter.put("/:id", updateExistingCar);
carRouter.delete("/:id", deleteExistingCar);

export default carRouter;
