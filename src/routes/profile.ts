import { Router } from 'express';
import * as profileController from '../controllers/profileController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, profileController.getProfile);
router.put('/', protect, profileController.updateProfile);

export default router; 