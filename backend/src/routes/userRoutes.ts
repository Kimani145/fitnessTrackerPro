import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser,
} from '../controllers/userController';

router.route('/').post(registerUser);
router.post('/login', authUser);

export default router;
