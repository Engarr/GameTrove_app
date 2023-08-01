import { useState, useEffect } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiFillHeart } from 'react-icons/ai';
import {
  usePostWishlistGameMutation,
  useGetUserIdQuery,
} from '../../store/api/userSlice';
import classes from './Wishlist.module.scss';

interface UserIdType {
  data: {
    userId: string;
    isAdded: boolean;
  };
  isLoading: boolean;
}

const Wishlist = () => {
  const token = useRouteLoaderData('root') as string;
  const param = useParams<{ gameId: string }>();
  const [skip, setSkip] = useState(true);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const gameId: string = param.gameId as string;
  let userId: string | null = null;

  const [onAddOrRemoveToWishlist] = usePostWishlistGameMutation();
  const { data: userData, isLoading: userDataLoading } =
    useGetUserIdQuery<UserIdType>(
      { token, gameId },
      {
        skip,
        refetchOnMountOrArgChange: true,
      }
    );
  useEffect(() => {
    if (token) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [token]);
  useEffect(() => {
    if (userData) {
      setIsOnWishlist(userData.isAdded);
    }
  }, [userData]);

  if (userData && !userDataLoading) {
    userId = userData.userId;
  }

  const addToWishlistHandler = async () => {
    try {
      if (gameId && userId) {
        const response = await onAddOrRemoveToWishlist({
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
  const isOnListCSS = isOnWishlist ? classes.active : '';
  const content = userId ? (
    <button
      type="button"
      className={classes.heart}
      onClick={addToWishlistHandler}
    >
      <AiFillHeart className={`${classes.heart__icon} ${isOnListCSS}`} />
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
