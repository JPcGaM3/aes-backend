// import * as CarModel from "../services/car_services";
import { HTTP_STATUS, MESSAGES } from "../configs/constants";
import { NextFunction, Request, Response } from "express";
import { CarService } from "../services/car.service";
import { formatResponse } from "../utils/response_formatter";

export const CarController = {
	getAll: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { ae_id } = req.query;
			const cars = await CarService.getAll(ae_id ? Number(ae_id) : undefined);
			if (!cars || cars.length === 0) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "No cars found." }));
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(cars));
		} catch (error) {
			next(error);
		}
	},

	setActive: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { id } = req.params;
			const { active } = req.body;
			const updatedCar = await CarService.setActive(
				Number(id),
				active,
				Number(req.currentUser.id)
			);
			if (!updatedCar) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse(null, { message: "Car not found." }));
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedCar));
		} catch (error) {
			next(error);
		}
	},
};
