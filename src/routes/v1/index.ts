import { Router } from "express";

import userRouter from "./user.route";
import reqOrderRouter from "./req_order.route";
import mitrRouter from "./mitr.route";
import customerTypeRouter from "./customer_type.route";
import operationAreaRouter from "./operation_area.route";
import companyFarmRouter from "./company_farm.route";
import carRouter from "./car.route";
import taskOrderRouter from "./task_order.route";
import toolTypeRouter from "./tool_type.route";
import aeAreaRouter from "./ae_area.route";
import activityRouter from "./activity.route";
import sysctlRouter from "./system_ctl.router";

const apiRouter = Router();

apiRouter.use("/mitr-portal", mitrRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/ae-areas", aeAreaRouter);
apiRouter.use("/customer-types", customerTypeRouter);
apiRouter.use("/operation-areas", operationAreaRouter);
apiRouter.use("/company-farms", companyFarmRouter);
apiRouter.use("/activities", activityRouter);
apiRouter.use("/tool-types", toolTypeRouter);
apiRouter.use("/cars", carRouter);

apiRouter.use("/request-orders", reqOrderRouter);
apiRouter.use("/task-orders", taskOrderRouter);

apiRouter.use("/system-control", sysctlRouter);

export default apiRouter;
