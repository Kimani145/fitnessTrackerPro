import express from 'express';
const router = express.Router();
import { getPosts, createPost } from '../controllers/postController';
import { protect } from '../middleware/authMiddleware';

router.route('/').get(getPosts).post(protect, createPost);

export default router;
