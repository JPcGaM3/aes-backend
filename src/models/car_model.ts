let cars = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2022 },
  { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
  { id: 3, make: 'Ford', model: 'Mustang', year: 2023 }
];

export const getAllCars = () => {
  return cars;
};

export const getCarById = (id: number) => {
  return cars.find(car => car.id === id);
};

export const createCar = (carData: any) => {
  const newCar = {
    id: cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1,
    ...carData
  };
  cars.push(newCar);
  return newCar;
};

export const updateCar = (id: number, carData: any) => {
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) return null;
  
  cars[index] = { ...cars[index], ...carData };
  return cars[index];
};

export const deleteCar = (id: number) => {
  const initialLength = cars.length;
  cars = cars.filter(car => car.id !== id);
  return cars.length !== initialLength;
};