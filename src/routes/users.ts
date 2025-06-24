import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/me', protect, userController.updateProfile);
router.delete('/me', protect, userController.deleteProfile);

export default router; 