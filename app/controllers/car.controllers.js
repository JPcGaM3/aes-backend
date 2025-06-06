import * as CarModel from '../models/car.model.js';

export const getCars = (req, res) => {
  res.status(200).json(CarModel.getAllCars());
};

export const getCar = (req, res) => {
  const car = CarModel.getCarById(parseInt(req.params.id));
  if (!car) return res.status(404).send('Car not found.');
  res.status(200).json(car);
};

export const createNewCar = (req, res) => {
  const newCar = CarModel.createCar(req.body);
  res.status(201).json(newCar);
};

export const updateExistingCar = (req, res) => {
  const updatedCar = CarModel.updateCar(parseInt(req.params.id), req.body);
  if (!updatedCar) return res.status(404).send('Car not found.');
  res.status(200).json(updatedCar);
};

export const deleteExistingCar = (req, res) => {
  const success = CarModel.deleteCar(parseInt(req.params.id));
  if (!success) return res.status(404).send('Car not found.');
  res.status(204).send();
};