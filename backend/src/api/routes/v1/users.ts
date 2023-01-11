import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middleWares/auth';

const usersRouter: Router = Router();

usersRouter.route('/account').get(Auth.authenticate, UserController.getUserDetail);

export default usersRouter;
