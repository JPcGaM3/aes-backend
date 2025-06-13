import * as CarModel from "../services/car_services";
import { HTTP_STATUS, MESSAGES } from "../configs/constants";

export const getCars = (_req: any, _res: any) => {
  _res.status(HTTP_STATUS.OK).json(CarModel.getAllCars());
};

export const getCar = (_req: any, _res: any) => {
  const car = CarModel.getCarById(parseInt(_req.params.id));
  if (!car) return _res.status(404).send("Car not found.");
  _res.status(HTTP_STATUS.OK).json(car);
};

export const createNewCar = (_req: any, _res: any) => {
  const newCar = CarModel.createCar(_req.body);
  _res.status(HTTP_STATUS.CREATED).json(newCar);
};

export const updateExistingCar = (_req: any, _res: any) => {
  const updatedCar = CarModel.updateCar(parseInt(_req.params.id), _req.body);
  if (!updatedCar) return _res.status(404).send("Car not found.");
  _res.status(HTTP_STATUS.OK).json(updatedCar);
};

export const deleteExistingCar = (_req: any, _res: any) => {
  const success = CarModel.deleteCar(parseInt(_req.params.id));
  if (!success) return _res.status(404).send("Car not found.");
  _res.status(HTTP_STATUS.NO_CONTENT).send();
};
