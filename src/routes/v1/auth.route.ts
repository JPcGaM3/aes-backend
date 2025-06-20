import { Router } from "express";
import { jwtAuth, loginUsername } from "../../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/", loginUsername);

export default authRouter;
