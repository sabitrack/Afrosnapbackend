import { Router } from 'express';
import * as cultureController from '../controllers/cultureController';

const router = Router();

router.get('/', cultureController.getAllCultures);
router.get('/:id', cultureController.getCultureById);
router.get('/country/:country', cultureController.getCulturesByCountry);
router.get('/continent/:continent', cultureController.getCulturesByContinent);

export default router; 