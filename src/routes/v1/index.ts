import { Router } from "express";

import carRouter from "./user_routes";
import homeRouter from "./home_routes";
import userRouter from "./user_routes";
import authRouter from "./auth_routes";
import reqOrderRouter from "./req_order_routes";
import mitrRouter from "./mitr_routes";

const apiRouter = Router();

apiRouter.use("/", homeRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/cars", carRouter);
apiRouter.use("/request-orders", reqOrderRouter);
apiRouter.use("/mitr-portal", mitrRouter);

export default apiRouter;
