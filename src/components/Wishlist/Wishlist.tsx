import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart } from 'react-icons/ai';
import { usePostWishlistGameMutation } from '../../store/api/userSlice';
import classes from './Wishlist.module.scss';

interface PropsType {
  userId: string | null;
  gameId: string | undefined;
}

const Wishlist = ({ userId, gameId }: PropsType) => {
  const [onAddToWishlist] = usePostWishlistGameMutation();

  const addToWishlistHandler = async () => {
    try {
      if (gameId && userId) {
        const response = await onAddToWishlist({
          gameId,
          userId,
        });
        if ('data' in response) {
          toast.success(response.data.message);
        } else if ('error' in response) {
          toast.error('Ups... Could not add game to wishlist');
        }
      }
    } catch (err) {
      toast.error('Ups... Could not to add game to wishlist');
      throw new Error('Ups... Could not to add game to wishlist');
    }
  };
  const content = userId ? (
    <button
      type="button"
      className={classes.heart}
      onClick={addToWishlistHandler}
    >
      <AiFillHeart className={classes.heart__icon} />
    </button>
  ) : (
    <button
      type="button"
      className={classes.blockHeart}
      onClick={addToWishlistHandler}
    >
      <AiFillHeart className={classes.heart__icon} />
      <p>You have to create account</p>
    </button>
  );

  return content;
};

export default Wishlist;
