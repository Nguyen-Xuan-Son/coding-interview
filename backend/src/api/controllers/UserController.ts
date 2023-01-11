import { NextFunction, Request, Response } from 'express';

import UserService from '../services/UserService';
import { CreateUserType } from '../types/user';

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
      const userId = Number(req.params.id);
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
