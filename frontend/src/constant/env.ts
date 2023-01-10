import dotenv from 'dotenv';

dotenv.config();

const { SERVER_URL } = process.env;

export { SERVER_URL };
