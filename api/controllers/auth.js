import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../model/user.js';

// eslint-disable-next-line import/prefer-default-export
export const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(422).json({ errors: error.array() });
    return;
  }
  const { userName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { repeatPassword } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      userName,
      password: hashedPassword,
      email,
    });
    await user.save();
    res.status(201).json({ message: 'The user has been created' });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'Something went wrong...';
    }
    next(err);
  }
};
