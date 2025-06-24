import { Router } from 'express';
import * as previewController from '../controllers/previewController';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Preview
 *   description: Preview styled photo
 */
/**
 * @swagger
 * /preview:
 *   post:
 *     summary: Generate a preview of the styled photo
 *     tags: [Preview]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               styleId:
 *                 type: string
 *                 description: ID of the selected style
 *               photoUrl:
 *                 type: string
 *                 description: URL of the uploaded photo
 *     responses:
 *       200:
 *         description: Preview generated
 */
router.post('/', protect, previewController.generatePreview);

export default router; 