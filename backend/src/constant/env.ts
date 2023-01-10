import dotenv from 'dotenv';

dotenv.config();

export const { PORT, JWT_SECRET_KEY, JWT_EXPIRED_TOKEN, DATABASE_URL } =
  process.env;
