import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: process.env.UPLOAD_PATH || './uploads' });

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Photo uploads
 */
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a photo
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 */
router.post('/', protect, upload.single('file'), uploadController.uploadFile);

export default router; 