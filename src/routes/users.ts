import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7c0b8b4d1c80015b4d1c8"
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           example: "jane@example.com"
 *         avatar:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         isPremium:
 *           type: boolean
 *           example: false
 *         preferences:
 *           type: object
 *           properties:
 *             language:
 *               type: string
 *               example: "en"
 *             notifications:
 *               type: boolean
 *               example: true
 *             darkMode:
 *               type: boolean
 *               example: true
 *             autoSave:
 *               type: boolean
 *               example: true
 *         stats:
 *           type: object
 *           properties:
 *             creations:
 *               type: integer
 *               example: 5
 *             favorites:
 *               type: integer
 *               example: 2
 *             cultures:
 *               type: integer
 *               example: 1
 *             downloads:
 *               type: integer
 *               example: 10
 *             shares:
 *               type: integer
 *               example: 3
 *             likes:
 *               type: integer
 *               example: 7
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 *           example: ["First Creation", "Shared a Photo"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', protect, userController.getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', protect, userController.getUserById);
/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
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
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *               preferences:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 *                     example: "en"
 *                   notifications:
 *                     type: boolean
 *                     example: true
 *                   darkMode:
 *                     type: boolean
 *                     example: true
 *                   autoSave:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/me', protect, userController.updateProfile);
/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
 */
router.delete('/me', protect, userController.deleteProfile);

export default router; 