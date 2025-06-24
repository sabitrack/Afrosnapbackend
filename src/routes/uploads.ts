import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: process.env.UPLOAD_PATH || './uploads' });

router.post('/', protect, upload.single('file'), uploadController.uploadFile);

export default router; 