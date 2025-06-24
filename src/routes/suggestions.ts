import { Router } from 'express';
import * as suggestionsController from '../controllers/suggestionsController';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Suggestions
 *   description: AI-powered style suggestions
 */
/**
 * @swagger
 * /suggestions:
 *   post:
 *     summary: Get AI-powered style suggestions
 *     tags: [Suggestions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photoUrl:
 *                 type: string
 *                 description: URL of the uploaded photo
 *     responses:
 *       200:
 *         description: AI style suggestions
 */
router.post('/', protect, suggestionsController.getSuggestions);

export default router; 