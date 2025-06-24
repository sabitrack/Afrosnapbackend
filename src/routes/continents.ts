import { Router } from 'express';
import * as continentController from '../controllers/continentController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Continents
 *   description: Manage continents
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Continent:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7c0b8b4d1c80015b4d1c8"
 *         name:
 *           type: string
 *           example: "Africa"
 *         emoji:
 *           type: string
 *           example: "🌍"
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["#FFD700", "#008000"]
 *         countries:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Nigeria", "Ghana"]
 *         description:
 *           type: string
 *           example: "The second largest continent."
 *         isActive:
 *           type: boolean
 *           example: true
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
 * /continents:
 *   get:
 *     summary: Get all continents
 *     tags: [Continents]
 *     responses:
 *       200:
 *         description: List of continents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Continent'
 */
router.get('/', continentController.getAllContinents);
/**
 * @swagger
 * /continents/{id}:
 *   get:
 *     summary: Get continent by ID
 *     tags: [Continents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Continent ID
 *     responses:
 *       200:
 *         description: Continent data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continent'
 */
router.get('/:id', continentController.getContinentById);

export default router; 