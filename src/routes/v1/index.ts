import { Router } from 'express';
import carRoutes from './car_routes.js';
import homeRoutes from './home_routes.js';

const router: Router = Router();

router.use('/', homeRoutes);
router.use('/car', carRoutes);

export default router;