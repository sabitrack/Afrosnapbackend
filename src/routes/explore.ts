import { Router } from 'express';
import * as exploreController from '../controllers/exploreController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Explore
 *   description: Explore cultural styles and items
 */
/**
 * @swagger
 * /explore:
 *   get:
 *     summary: Get explore items
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: List of explore items
 */
router.get('/', exploreController.getExploreItems);

export default router; 