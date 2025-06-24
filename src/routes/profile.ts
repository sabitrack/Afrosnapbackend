import { Router } from 'express';
import * as profileController from '../controllers/profileController';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
router.get('/', protect, profileController.getProfile);
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user profile
 */
router.put('/', protect, profileController.updateProfile);

export default router; 