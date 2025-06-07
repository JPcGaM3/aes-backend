import { Router } from 'express';
import {
  getCars,
  getCar,
  createNewCar,
  updateExistingCar,
  deleteExistingCar,
} from '../../controllers/car_controllers.ts';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', createNewCar);
router.put('/:id', updateExistingCar);
router.delete('/:id', deleteExistingCar);


export default router;