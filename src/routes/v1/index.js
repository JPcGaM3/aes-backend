import { Router } from 'express';
import carRoutes from './car.routes.js';
import homeRoutes from './home.routes.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/car', carRoutes);

export default router;