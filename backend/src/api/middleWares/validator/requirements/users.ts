import { body } from 'express-validator';

const usersRequirement = {
  createUsers: [body('email').isEmail(), body('password').isString().isLength({ min: 5 })]
};

export default usersRequirement;
