import { useState, useEffect } from 'react';
import ToolBar from './ToolBar/ToolBar';
import ComingGameCard from './ComingGames/ComingGameCard';
import classes from './ComingSoon.module.scss';
import { useGetComingGamesQuery } from '../../store/api/feedSlice';
import { comingGamePlatforms } from '../../util/db';
import DivLoader from '../Spinner/SkeletonDivLoader/DivLoader';

interface DataType {
  data: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    first_release_date: number;
    platforms: {
      id: number;
      name: string;
    }[];
  }[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

const CommingSoon = () => {
  const [activeSearch, setActiveSearch] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const { data, isLoading, isError, isFetching } =
    useGetComingGamesQuery<DataType>(activeSearch);

  useEffect(() => {
    setFadeIn(true);

    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeSearch]);

  const platformName = comingGamePlatforms.find(
    (platfrom) => platfrom.id === activeSearch
  );
  let comingContent;
  if (isLoading || isFetching) {
    comingContent = <DivLoader />;
  } else if (data) {
    comingContent = (
      <div className={classes.wrapper__gamesContainer}>
        {data.map((game) => (
          <ComingGameCard
            key={game.id}
            name={game.name}
            img={game.cover && game.cover.url}
            date={game.first_release_date}
            id={game.id}
            platforms={game.platforms}
          />
        ))}
      </div>
    );
  }
  return (
    <section className={classes.wrapper}>
      <h2>
        Upcoming games for the platform:
        <span className={fadeIn ? classes.fadeIn : ''}>
          {platformName?.name}
        </span>
      </h2>
      <ToolBar setActiveSearch={setActiveSearch} activeSearch={activeSearch} />
      {comingContent}
    </section>
  );
};

export default CommingSoon;
