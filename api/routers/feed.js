import { Router } from 'express';
import { getGames, getBannerGames } from '../controllers/feed.js';
import getToken from '../middleware/getToken.js';

const router = Router();

router.post('/games', getToken, getGames);
router.post('/bannerGames', getToken, getBannerGames);

export default router;
