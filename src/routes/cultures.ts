import { Router } from 'express';
import * as cultureController from '../controllers/cultureController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cultures
 *   description: Manage cultures
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Culture:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7c0b8b4d1c80015b4d1c8"
 *         name:
 *           type: string
 *           example: "Yoruba"
 *         country:
 *           type: string
 *           example: "Nigeria"
 *         continent:
 *           type: string
 *           example: "Africa"
 *         description:
 *           type: string
 *           example: "A major ethnic group in West Africa."
 *         imageUrl:
 *           type: string
 *           example: "https://example.com/yoruba.jpg"
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["#FFD700", "#008000"]
 *         category:
 *           type: string
 *           example: "Traditional"
 *         difficulty:
 *           type: string
 *           example: "Medium"
 *         popularity:
 *           type: number
 *           example: 80
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
 * /cultures:
 *   get:
 *     summary: Get all cultures
 *     tags: [Cultures]
 *     responses:
 *       200:
 *         description: List of cultures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 */
router.get('/', cultureController.getAllCultures);
/**
 * @swagger
 * /cultures/{id}:
 *   get:
 *     summary: Get culture by ID
 *     tags: [Cultures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Culture ID
 *     responses:
 *       200:
 *         description: Culture data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Culture'
 */
router.get('/:id', cultureController.getCultureById);
/**
 * @swagger
 * /cultures/country/{country}:
 *   get:
 *     summary: Get cultures by country
 *     tags: [Cultures]
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: Country name
 *     responses:
 *       200:
 *         description: List of cultures for the country
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 */
router.get('/country/:country', cultureController.getCulturesByCountry);
/**
 * @swagger
 * /cultures/continent/{continent}:
 *   get:
 *     summary: Get cultures by continent
 *     tags: [Cultures]
 *     parameters:
 *       - in: path
 *         name: continent
 *         schema:
 *           type: string
 *         required: true
 *         description: Continent name
 *     responses:
 *       200:
 *         description: List of cultures for the continent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Culture'
 */
router.get('/continent/:continent', cultureController.getCulturesByContinent);

export default router; 