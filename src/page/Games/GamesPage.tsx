import { useLocation } from 'react-router-dom';
import { useGetSpecificGamesQuery } from '../../store/api/feedSlice';
import { GameData } from '../../Types/types';
import classes from './GamePage.module.scss';
import FilterSection from '../../components/FilterSection/FilterSection';
import Spiner from '../../components/Spinner/Spinner/Spiner';
import ErrorComponent from '../../components/Spinner/ErrorComponent/ErrorComponent';
import GameCard from '../../components/GamePageComponents/GameCard/GameCard';
import Pagination from '../../components/GamePageComponents/Pagination/Pagination';

import LoadingCard from '../../components/GamePageComponents/LoadingComponent/LoadingCard';

interface ResponseType {
  data: { games: GameData[]; totalGames: { count: number } };
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}
const GamesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') as string;
  const platformParam = searchParams.get('platform') as string;
  const pageParam = searchParams.get('page') as string;
  const queryParams = {
    category: categoryParam,
    platform: platformParam,
    page: pageParam,
  };
  let content;
  const { data, isLoading, isError, isFetching } =
    useGetSpecificGamesQuery<ResponseType>(queryParams, {
      refetchOnMountOrArgChange: true,
    });
  if (isLoading) {
    content = <Spiner message="Loading" />;
  } else if (isError) {
    content = (
      <ErrorComponent message="Page loading error. Please try again later" />
    );
  } else if (data) {
    content = (
      <>
        <FilterSection
          categoryParam={categoryParam}
          platformParam={platformParam}
        />
        {data.games.length !== 0 && (
          <Pagination totalPages={data.totalGames.count} />
        )}

        {isFetching ? (
          <LoadingCard />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {data.games.length === 0 ? (
              <>
                <Pagination totalPages={data.totalGames.count} />
                <ErrorComponent message="Ups... There is no such a game. Please change filters" />
              </>
            ) : (
              <>
                <div className={classes.gamesContainer}>
                  {data.games.map((game) => (
                    <GameCard
                      key={game.id}
                      id={game.id}
                      name={game.name}
                      geners={game.genres}
                      summary={game.summary}
                      platforms={game.platforms}
                      img={
                        game.cover
                          ? game.cover.url
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgxr1R7VtfzTnb7T1xo3RWbgrPNbf3RgvJ63abVkeyzxq1gLGb50lacEnZof8bSf4h4Ww&usqp=CAU'
                      }
                    />
                  ))}
                </div>
                <Pagination totalPages={data.totalGames.count} />
              </>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <section className={classes.section}>
      <h2 className={classes.section__title}>Game encyclopedia</h2>
      {content}
    </section>
  );
};

export default GamesPage;
