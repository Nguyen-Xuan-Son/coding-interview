import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserOutput } from '../models/User';

interface IUserService {
  createUser(payload: UserInput): Promise<UserOutput>;
  getUserDetail(userId: number): Promise<UserOutput>;
}

class UserService implements IUserService {
  async createUser(payload: UserInput): Promise<UserOutput> {
    const user = await UserRepository.getUserByEmail(payload.email);

    if (user) {
      throw new Error('Email must be unique');
    }

    const hashedPassword = bcrypt.hashSync(payload.password, 5);

    return UserRepository.createUser({
      ...payload,
      password: hashedPassword
    });
  }

  async getUserDetail(userId: number): Promise<UserOutput> {
    const user = await UserRepository.getUserDetail(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.password = '';

    return user;
  }
}

export default new UserService();
