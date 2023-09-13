import { Router } from 'express';
import {
  getGames,
  getBannerGames,
  getCategoryGames,
  getGameDetails,
  searchGames,
  getSpecificGames,
  getComingGames,
} from '../controllers/feed.js';
import getToken from '../middleware/getToken.js';

const router = Router();

router.post('/games', getToken, getGames);
router.post('/bannerGames', getToken, getBannerGames);
router.post('/categoryGames', getToken, getCategoryGames);
router.post('/game/:gameId', getToken, getGameDetails);
router.post(`/search`, getToken, searchGames);
router.post(`/filteredGames`, getToken, getSpecificGames);
router.post(`/comingGames`, getToken, getComingGames);

export default router;
