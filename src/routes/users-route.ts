import { Router } from 'express';
import { registration, login, getUserDetails } from '../controller/user-controller';

const router = Router();


router.post('/sign-up', registration);
router.post('/sign-in', login);
router.get('/:userId', getUserDetails);

export default router;