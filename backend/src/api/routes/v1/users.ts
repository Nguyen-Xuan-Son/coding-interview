import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middleWares/auth';
import { Validate, Requirements } from '../../middleWares/validator';

const usersRouter: Router = Router();

usersRouter
  .route('/:id')
  .get(Auth.authenticate, Validate(Requirements.getUserDetail), UserController.getUserDetail);

export default usersRouter;
