import bcrypt from 'bcrypt';
import axios from 'axios';
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
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(422).json({ errors: error.array() });
    return;
  }
  const { email } = req.body;
  const { password } = req.body;

  let loadedUser;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: 'There is no such user',
      });
      const err = new Error(
        'The user with this email address could not be found'
      );
      error.statusCode = 401;
      throw err;
    }

    loadedUser = user;

    const isEqual = await bcrypt.compare(password, loadedUser.password);

    if (!isEqual) {
      res.status(401).json({
        message: 'Email or password is incorrect',
      });
      const err = new Error('The password is incorrect!');
      error.statusCode = 401;
      throw err;
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
export const getUserInfo = async (req, res, next) => {
  const { gameId } = req.params;
  const { userId } = req;
  try {
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        res.status(401).json({
          message: 'There is no such user',
        });
        const err = new Error(
          'The user with this email address could not be found'
        );
        err.statusCode = 401;
        throw err;
      }
      const isAdded = user.wishLists.some(
        (game) => game.gameNumber.toString() === gameId
      );
      const userWishlist = user.wishLists;

      res.status(200).json({ userId, isAdded, userWishlist });
    } else {
      res.status(200).json({ userId: null });
    }
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'Something went wrong...';
    }
    next(err);
  }
};
export const putWishlist = async (req, res, next) => {
  const { userId } = req.body;
  const { gameId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({
        message: 'There is no such user',
      });
      const err = new Error(
        'The user with this email address could not be found'
      );
      err.statusCode = 401;
      throw err;
    }

    const isAdded = user.wishLists.some(
      (game) => game.gameNumber.toString() === gameId.toString()
    );

    if (!isAdded) {
      user.wishLists.push({ gameNumber: gameId });
      await user.save();
      res.status(200).json({ message: 'Game has been added to your wishlist' });
    } else {
      user.wishLists = user.wishLists.filter(
        (game) => game.gameNumber.toString() !== gameId.toString()
      );

      await user.save();
      res
        .status(201)
        .json({ message: 'Game has been removed from your wishlist' });
    }
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'Something went wrong...';
    }
  }
};

export const getUserWishlist = async (req, res, next) => {
  const { userId } = req;
  const { token } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({
        message: 'There is no such user',
      });
      const err = new Error(
        'The user with this email address could not be found'
      );
      err.statusCode = 401;
      throw err;
    }

    if (user.wishLists.length === 0) {
      res.status(200).json([]);
      return;
    }
    const wishlistArr = user.wishLists.map((game) => game.gameNumber);
    const query = `fields name, cover.url; where id = (${wishlistArr}); limit 10;`;

    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const games = response.data;

    const combinedList = games.map((game) => {
      const matching = user.wishLists.find(
        (item) => item.gameNumber.toString() === game.id.toString()
      );
      return {
        ...game,
        addedAt: matching ? matching.addedAt : null,
      };
    });
    res.status(200).json(combinedList);
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'Something went wrong...';
    }
  }
};
