import { Router } from 'express';
import * as favoritesController from '../controllers/favoritesController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, favoritesController.getFavorites);
router.post('/', protect, favoritesController.addFavorite);
router.delete('/:id', protect, favoritesController.removeFavorite);

export default router; 