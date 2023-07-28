import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(422).json({ errors: error.array() });
    return;
  }
  const { userName } = req.body;
  const { email } = req.body;
  const { password } = req.body;

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
export const login = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  let loadedUser;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error(
        'The user with this email address could not be found'
      );
      error.statusCode = 401;
      throw error;
    }

    loadedUser = user;

    const isEqual = await bcrypt.compare(password, loadedUser.password);

    if (!isEqual) {
      const error = new Error('The password is incorrect!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        // eslint-disable-next-line no-underscore-dangle
        userId: loadedUser._id.toString(),
      },
      process.env.VITE_SECRET_TOKEN,
      { expiresIn: '48h' }
    );
    console.log(token);
    res.status(200).json({
      token,
    });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'Something went wrong...';
    }
    next(err);
  }
};
