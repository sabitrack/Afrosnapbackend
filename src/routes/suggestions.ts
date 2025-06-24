import { Router } from 'express';
import * as suggestionsController from '../controllers/suggestionsController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', protect, suggestionsController.getSuggestions);

export default router; 