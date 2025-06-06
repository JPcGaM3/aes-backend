import { HTTP_STATUS, MESSAGES } from '../configs/constants.js';

export const getHome = (req:any, res:any) => {
    res.status(HTTP_STATUS.OK).send('Hello World!');
}