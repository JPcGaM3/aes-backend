import { Router } from "express";
import { getHome } from "../../controllers/home_controllers";

const homeRouter = Router();

homeRouter.get("/", getHome);

export default homeRouter;
