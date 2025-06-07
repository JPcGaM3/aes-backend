import { HTTP_STATUS, MESSAGES } from '../configs/constants.js';

export const getHome = (_req: any, _res: any) => {
    _res.status(HTTP_STATUS.OK).send('Hello World!');
}