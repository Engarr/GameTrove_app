import { Router } from 'express';
import {
  getGames,
  getBannerGames,
  getNewCategoryGames,
} from '../controllers/feed.js';
import getToken from '../middleware/getToken.js';

const router = Router();

router.post('/games', getToken, getGames);
router.post('/bannerGames', getToken, getBannerGames);
router.post('/randomGames', getToken, getNewCategoryGames);

export default router;
