import { Router } from 'express';
import * as previewController from '../controllers/previewController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', protect, previewController.generatePreview);

export default router; 