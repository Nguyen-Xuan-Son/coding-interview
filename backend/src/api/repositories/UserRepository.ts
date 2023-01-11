import { PrismaClient } from '@prisma/client';
import { UserInput, UserOutput } from '../models/User';

interface IUserRepository {
  createUser(payload: UserInput): Promise<UserOutput>;
  getUserDetail(userId: number): Promise<UserOutput | null>;
  getUserByEmail(email: string): Promise<UserOutput | null>;
}

const prisma = new PrismaClient();

class UserRepository implements IUserRepository {
  async createUser(payload: UserInput): Promise<UserOutput> {
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: payload.password
      }
    });
    return user;
  }

  async getUserDetail(userId: number): Promise<UserOutput | null> {
    const user = await prisma.user.findFirst({
      where: { id: userId }
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<UserOutput | null> {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    return user;
  }
}

export default new UserRepository();
