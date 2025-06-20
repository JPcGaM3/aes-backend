import { Router } from "express";

import homeRouter from "./home.route";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import reqOrderRouter from "./req_order.route";
import mitrRouter from "./mitr.route";
import customerTypeRouter from "./customer_type.route";
import operationAreaRouter from "./operation_area.route";
import companyFarmRouter from "./company_farm.route";

const apiRouter = Router();

apiRouter.use("/", homeRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/request-orders", reqOrderRouter);
apiRouter.use("/mitr-portal", mitrRouter);
apiRouter.use("/customer-types", customerTypeRouter);
apiRouter.use("/operation-areas", operationAreaRouter);
apiRouter.use("/company-farms", companyFarmRouter);

export default apiRouter;
