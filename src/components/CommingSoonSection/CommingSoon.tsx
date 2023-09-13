import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from './ToolBar/ToolBar';
import ComingGameCard from './ComingGames/ComingGameCard';
import classes from './ComingSoon.module.scss';
import { useGetComingGamesQuery } from '../../store/api/feedSlice';
import { comingGamePlatforms } from '../../util/db';
import ErrorComponent from '../UI/ErrorComponent/ErrorComponent';
import ComingSoonLoader from './CominSoonLoader/ComingSoonLoader';
import MoreBtn from './MoreBtn/MoreBtn';
import {
  SearchPlatform,
  setSearchPlatformHandler,
} from '../../store/slice/UiSLice';

export interface DataResponseType {
  data: {
    games: {
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
    totalGames: {
      count: number;
    };
  };
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

const CommingSoon = () => {
  const platform = useSelector(SearchPlatform);
  const dispacth = useDispatch();

  const [fadeIn, setFadeIn] = useState(false);
  const [skip, setSkip] = useState(true);

  const options = {
    threshold: 0,
    triggerOnce: true,
  };
  const { ref: locationRef, inView } = useInView(options);

  const { data, isLoading, isError, isFetching } =
    useGetComingGamesQuery<DataResponseType>(
      { platform, offset: 0 },
      {
        skip,
      }
    );

  const activeSearchHandler = (name: number) => {
    dispacth(setSearchPlatformHandler(name));
  };
  useEffect(() => {
    if (inView) {
      setSkip(false);
    }
  }, [inView]);

  useEffect(() => {
    setFadeIn(true);

    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [platform]);

  const platformName = comingGamePlatforms.find(
    (platfrom) => platfrom.id === platform
  );
  let comingContent;
  if (isLoading || isFetching) {
    comingContent = <ComingSoonLoader />;
  } else if (isError) {
    comingContent = (
      <ErrorComponent message="Page loading error. Please try again later" />
    );
  } else if (data) {
    comingContent = (
      <>
        {data.games.map((game) => (
          <ComingGameCard
            key={game.id}
            name={game.name}
            img={game.cover && game.cover.url}
            date={game.first_release_date}
            id={game.id}
            platforms={game.platforms}
          />
        ))}
      </>
    );
  }
  return (
    <section className={classes.wrapper} ref={locationRef}>
      <h2>
        Upcoming games for the platform:
        <span className={fadeIn ? classes.fadeIn : ''}>
          {platformName?.name}
        </span>
      </h2>
      <p>
        <span>**</span>According to the most expected
      </p>
      <ToolBar
        activeSearch={platform}
        activeSearchHandler={activeSearchHandler}
      />
      <div
        className={`${
          isError ? classes.error : classes.wrapper__gamesContainer
        }`}
      >
        {comingContent}
        {data && data.totalGames.count >= 10 && !isFetching && !isLoading && (
          <MoreBtn />
        )}
      </div>
    </section>
  );
};

export default CommingSoon;
