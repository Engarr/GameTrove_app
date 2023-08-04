import { useRouteLoaderData } from 'react-router-dom';
import { useGetUserWishlistQuery } from '../../../store/api/userSlice';
import classes from './WishlistTab.module.scss';
import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';
import Wishlist from '../../Wishlist/Wishlist';

interface UserWislistType {
  data: {
    id: number;
    cover: {
      id: number;
      url: string;
    };
    name: string;
  }[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}
interface PropsType {
  skipSearch: boolean;
}

const WishlistTaba = ({ skipSearch }: PropsType) => {
  const token = useRouteLoaderData('root') as string;
  const emptyCards = 5;

  const { data, isLoading, isFetching } =
    useGetUserWishlistQuery<UserWislistType>(token, {
      refetchOnMountOrArgChange: true,
      skip: skipSearch,
    });

  let content;

  if (isLoading || isFetching) {
    content = (
      <>
        {Array.from({ length: emptyCards }, (_, index) => (
          <div className={classes.emptyCard} key={index}>
            <DivLoader />
          </div>
        ))}
      </>
    );
  }
  if (data && data.length > 0) {
    content = (
      <>
        {data.map((game) => {
          const newImg = game.cover.url.replace('t_thumb', 't_1080p');
          const newGameId = game.id.toString();
          return (
            <div key={game.id} className={classes.gameCard}>
              <div className={classes.gameCard__heart}>
                <Wishlist gameId={newGameId} />
              </div>
              <img src={newImg} alt={game.name} />
            </div>
          );
        })}
      </>
    );
  }
  return <div className={classes.wishContainer}>{content}</div>;
};

export default WishlistTaba;
