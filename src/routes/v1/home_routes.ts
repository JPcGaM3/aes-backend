import { Router } from 'express';
import { getHome } from '../../controllers/home_controllers.js';

const router = Router();

router.get('/', getHome);

export default router;