import { Router } from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth.js';
import User from '../model/user.js';

const router = Router();

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

router.put(
  '/signup',
  [
    body('userName', 'Please write your name').isLength({ min: 1 }).trim(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address. ')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              new CustomError('Email address already exists!')
            );
          }
          return true;
        });
      })
      .normalizeEmail()
      .trim(),
    body(
      'password',
      'The password must contain at least one capital letter and one special character and be longer than 5 characters'
    )
      .isLength({ min: 5 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$&*])/),
    body('repeatPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(
          new CustomError('The passwords must be identical')
        );
      }
      return true;
    }),
  ],
  signup
);
router.post(
  '/login',
  [
    body('email', 'Please enter a valid email address.')
      .isEmail()
      .normalizeEmail()
      .trim(),
    body('password', 'This field can not be empty').trim().not().isEmpty(),
  ],
  login
);

export default router;
