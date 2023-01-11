import { NextFunction, Request, Response } from 'express';

import { CreateDocumentType } from '../types/document';
import DocumentService from '../services/DocumentService';
import JWT from '../../utils/jwt';

class DocumentController {
  async createDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = String(req.headers.authorization);
      if (!authorization || !authorization.includes('Bearer')) {
        res.sendStatus(401);
        return;
      }
      const token = authorization?.slice(7);

      const verifyTokenPayload = await JWT.verifyToken(token);
      if (!verifyTokenPayload) {
        res.sendStatus(401);
        return;
      }

      const payload: CreateDocumentType = req.body;
      const userId: number = verifyTokenPayload.id as number;

      const document = await DocumentService.createDocument({
        hash: payload.hash,
        authorId: userId
      });
      res.status(200).send({
        message: 'Document created successfully',
        data: document
      });
    } catch (error) {
      next(error);
    }
  }

  async getDocumentDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload: CreateDocumentType = req.body;

      const document = await DocumentService.getDocumentByHash(payload.hash);

      res.status(200).send({
        message: 'Document fetched successfully',
        data: document
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DocumentController();
