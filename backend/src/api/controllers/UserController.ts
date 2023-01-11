import { NextFunction, Request, Response } from 'express';

import { CreateUserType } from '../types/user';
import UserService from '../services/UserService';
import JWT from '../../utils/jwt';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload: CreateUserType = req.body;
      const user = await UserService.createUser(payload);
      res.status(200).send({
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = String(req.headers.authorization);
      if (!authorization || !authorization.includes('Bearer')) {
        res.sendStatus(401);
        return;
      }
      const token = authorization?.slice(7);

      const payload = await JWT.verifyToken(token);
      if (!payload) {
        res.sendStatus(401);
        return;
      }

      const userId: number = payload.id as number;
      const user = await UserService.getUserDetail(userId);

      res.status(200).send({
        message: 'User details fetched successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
