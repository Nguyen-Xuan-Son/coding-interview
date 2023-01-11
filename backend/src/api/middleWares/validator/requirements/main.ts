import { body } from 'express-validator';

const mainRequirement = {
  login: [body('email').isEmail(), body('password').isString().isLength({ min: 5 })],
  signup: [body('email').isEmail(), body('password').isString().isLength({ min: 5 })]
};

export default mainRequirement;
