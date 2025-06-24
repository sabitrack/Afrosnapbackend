import { Router } from 'express';
import * as exploreController from '../controllers/exploreController';

const router = Router();

router.get('/', exploreController.getExploreItems);

export default router; 