import { HTTP_STATUS } from "../configs/constants.js";

export const loginUsename = (_req: any, _res: any, _next: any) => {
  if (_req.body.username === "admin" && _req.body.password === "1234") {
    _res.status(HTTP_STATUS.OK).send("User " + _req.body.username + " login success");
  } else {
    _res.status(HTTP_STATUS.UNAUTHORIZED).send("Error: username or password is incorrect");
  }
};