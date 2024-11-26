import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
  deletePost,
} from '../controller/blog-controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();


router.post('/', authenticate,createPost);
router.get('/', getAllPosts);
router.get('/:postId', getSpecificPost);
router.put('/:postId', authenticate, updatePost);
router.delete('/:postId', authenticate, deletePost);

export default router;