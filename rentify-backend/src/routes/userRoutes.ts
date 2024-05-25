import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);

export default router;
