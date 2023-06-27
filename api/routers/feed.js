import { Router } from 'express';
import { getGames, getNotReleased } from '../controllers/feed.js';
import getToken from '../middleware/getToken.js';

const router = Router();

router.post('/games', getToken, getGames);
router.post('/notReleased', getToken, getNotReleased);

export default router;
