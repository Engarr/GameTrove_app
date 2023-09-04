import { Link, useRouteLoaderData } from 'react-router-dom';
import { TfiMoreAlt } from 'react-icons/tfi';
import { useGetUserWishlistQuery } from '../../../store/api/userSlice';
import classes from './WishlistTab.module.scss';
import Wishlist from '../../WishlistButton/Wishlist';
import Loader from './Loader/Loader';
import EmptyList from './EmptyList/EmptyList';

interface UserWislistType {
  data: {
    id: number;
    cover: {
      id: number;
      url: string;
    };
    name: string;
    addedAt: string;
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

  const { data, isLoading, isFetching } =
    useGetUserWishlistQuery<UserWislistType>(token, {
      refetchOnMountOrArgChange: true,
      skip: skipSearch,
    });

  let content;
  if (isLoading || isFetching) {
    content = <Loader />;
  }
  if (data && data.length === 0) {
    content = <EmptyList />;
  }
  if (data && data.length > 0) {
    content = (
      <div className={classes.container}>
        <h2>Games you like</h2>
        <div className={classes.container__cards}>
          {data.map((game) => {
            const newImg = game.cover.url.replace('t_thumb', 't_1080p');
            const newGameId = game.id.toString();
            return (
              <div key={game.id} className={classes.gameCard}>
                <div className={classes.gameCard__heart}>
                  <Wishlist gameId={newGameId} />
                </div>
                <div className={classes.gameCard__name}>
                  <Link to={`/game/${game.id}`}>
                    {game.name}
                    <TfiMoreAlt />
                  </Link>
                </div>
                <img src={newImg} alt={game.name} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div className={classes.wishContainer}>{content}</div>;
};

export default WishlistTaba;
