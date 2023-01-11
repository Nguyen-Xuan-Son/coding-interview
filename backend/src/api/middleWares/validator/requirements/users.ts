import { body, param } from 'express-validator';

const usersRequirement = {
  createUsers: [body('email').isEmail(), body('password').isString().isLength({ min: 5 })],
  getUserDetail: [param('id').isInt()]
};

export default usersRequirement;
