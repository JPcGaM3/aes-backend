import { Router } from 'express';
import { getHome } from '../../controllers/home.controllers.js';

const router = Router();

router.get('/', getHome);

export default router;