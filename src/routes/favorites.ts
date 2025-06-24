import { Router } from 'express';
import * as favoritesController from '../controllers/favoritesController';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Manage user favorites
 */
/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites for the current user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorites
 */
router.get('/', protect, favoritesController.getFavorites);
/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a new favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item to favorite
 *     responses:
 *       200:
 *         description: Favorite added
 */
router.post('/', protect, favoritesController.addFavorite);
/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Remove a favorite by ID
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Favorite ID
 *     responses:
 *       200:
 *         description: Favorite removed
 */
router.delete('/:id', protect, favoritesController.removeFavorite);

export default router; 