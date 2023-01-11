import { Router } from 'express';
import mainRouter from './main';
import usersRouter from './users';
import documentsRouter from './document';

const router: Router = Router();

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/document', documentsRouter);

export default router;
