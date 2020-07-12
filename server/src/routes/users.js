import { Router } from 'express';
import { users } from '../controllers/index';

const router = new Router();

router.get('/', users.get);

export default router