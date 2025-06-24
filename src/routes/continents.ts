import { Router } from 'express';
import * as continentController from '../controllers/continentController';

const router = Router();

router.get('/', continentController.getAllContinents);
router.get('/:id', continentController.getContinentById);

export default router; 