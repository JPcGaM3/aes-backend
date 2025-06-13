import { Router } from "express";

import carRouter from "./user_routes";
import homeRouter from "./home_routes";
import userRouter from "./user_routes";
import authRouter from "./auth_routes";

const apiRouter = Router();

apiRouter.use("/", homeRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/car", carRouter);

export default apiRouter;
