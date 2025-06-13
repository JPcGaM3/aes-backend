import { Router } from "express";
import { jwtAuth, loginUsername } from "../../controllers/auth_controllers";

const authRouter = Router();

authRouter.post("/", loginUsername);

export default authRouter;
