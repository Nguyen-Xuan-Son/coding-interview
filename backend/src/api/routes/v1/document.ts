import { Router } from 'express';
import DocumentController from '../../controllers/DocumentController';
import Auth from '../../middleWares/auth';

const usersRouter: Router = Router();

usersRouter
  .route('/')
  .put(Auth.authenticate, DocumentController.getDocumentDetail)
  .post(Auth.authenticate, DocumentController.createDocument);

export default usersRouter;
