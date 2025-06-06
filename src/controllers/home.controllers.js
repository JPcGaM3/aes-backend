import { HTTP_STATUS, MESSAGES } from '../configs/constants.js';

export const getHome = (req, res) => {
    res.status(HTTP_STATUS.OK).send('Hello World!');
}