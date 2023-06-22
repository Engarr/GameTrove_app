import { Router } from 'express';
import { getGames } from '../controllers/feed.js';
import getToken from '../middleware/getToken.js';

const router = Router();

router.post('/games', getToken, getGames);

export default router;
