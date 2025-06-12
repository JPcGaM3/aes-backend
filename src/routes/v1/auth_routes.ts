import { Router } from 'express';
import { loginUsename } from '../../controllers/auth_controllers.js';

const router = Router();

router.post("/login", loginUsename)

export default router