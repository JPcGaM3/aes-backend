import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "./constants.js";

export const Page_Not_Found = (_req: Request, _res: Response, _next: NextFunction) => {
  _res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Resource not found' });
}

export const Page_Internal_Error = (_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  console.error(_err.stack);
  _res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong!' });
}