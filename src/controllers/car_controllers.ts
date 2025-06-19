// import * as CarModel from "../services/car_services";
import { HTTP_STATUS, MESSAGES } from "../configs/constants";
import { Request, Response } from "express";

// export const getCars = (req: Request, res: Response) => {
//   return res.status(HTTP_STATUS.OK).json(CarModel.getAllCars());
// };

// export const getCar = (req: Request, res: Response) => {
//   const car = CarModel.getCarById(parseInt(req.params.id));
//   if (!car) return res.status(404).send("Car not found.");
//   return res.status(HTTP_STATUS.OK).json(car);
// };

// export const createNewCar = (req: Request, res: Response) => {
//   const newCar = CarModel.createCar(req.body);
//   return res.status(HTTP_STATUS.CREATED).json(newCar);
// };

// export const updateExistingCar = (req: Request, res: Response) => {
//   const updatedCar = CarModel.updateCar(parseInt(req.params.id), req.body);
//   if (!updatedCar) return res.status(404).send("Car not found.");
//   return res.status(HTTP_STATUS.OK).json(updatedCar);
// };

// export const deleteExistingCar = (req: Request, res: Response) => {
//   const success = CarModel.deleteCar(parseInt(req.params.id));
//   if (!success) return res.status(404).send("Car not found.");
//   return res.status(HTTP_STATUS.NO_CONTENT).send();
// };
