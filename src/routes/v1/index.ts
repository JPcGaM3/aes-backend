import { Router } from "express";

import carRouter from "./user_routes";
import homeRouter from "./home_routes";
import userRouter from "./user_routes";
import authRouter from "./auth_routes";
import reqOrderRouter from "./req_order_routes";

const apiRouter = Router();

apiRouter.use("/", homeRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/car", carRouter);
apiRouter.use("/request-order", reqOrderRouter);

export default apiRouter;
