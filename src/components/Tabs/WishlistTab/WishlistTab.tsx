import { Link, useRouteLoaderData } from 'react-router-dom';
import { TfiMoreAlt } from 'react-icons/tfi';
import { useGetUserWishlistQuery } from '../../../store/api/userSlice';
import classes from './WishlistTab.module.scss';
import DivLoader from '../../UI/SkeletonDivLoader/DivLoader';
import Wishlist from '../../WishlistButton/Wishlist';

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
  const emptyCards = 5;

  const { data, isLoading, isFetching } =
    useGetUserWishlistQuery<UserWislistType>(token, {
      refetchOnMountOrArgChange: true,
      skip: skipSearch,
    });

  let content;
  console.log(data[0].addedAt);
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
              {/* <div className={classes.gameCard__name}> */}
              <Link to={`/game/${game.id}`}>
                {game.name}
                <TfiMoreAlt />
              </Link>
              {/* </div> */}
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
