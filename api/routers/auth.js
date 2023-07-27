import { Router } from 'express';
import { signup } from '../controllers/auth.js';

const router = Router();

router.put('/signup', signup);

export default router;
