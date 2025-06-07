import { Router } from 'express';
import carRoutes from './car_routes.ts';
import homeRoutes from './home_routes.ts';

const router: Router = Router();

router.use('/', homeRoutes);
router.use('/car', carRoutes);

export default router;