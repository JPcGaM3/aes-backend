import { Router } from "express";

import carRouter from "./user_routes";
import homeRouter from "./home_routes";
import userRouter from "./user_routes";
import authRouter from "./auth_routes";
import reqOrderRouter from "./req_order_routes";
import mitrRouter from "./mitr_routes";
import customerTypeRouter from "./customer_type_routes";
import operationAreaRouter from "./operation_area_routes";
import companyFarmRouter from "./company_farm_routes";

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
