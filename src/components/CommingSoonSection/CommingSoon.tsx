import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ToolBar from './ToolBar/ToolBar';
import ComingGameCard from './ComingGames/ComingGameCard';
import classes from './ComingSoon.module.scss';
import { useGetComingGamesQuery } from '../../store/api/feedSlice';
import { comingGamePlatforms } from '../../util/db';
import DivLoader from '../Spinner/SkeletonDivLoader/DivLoader';
import ErrorComponent from '../Spinner/ErrorComponent/ErrorComponent';

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
  const [skip, setSkip] = useState(true);
  const emptyCards = 5;
  const options = {
    threshold: 0,
    triggerOnce: true,
  };
  const { ref: locationRef, inView } = useInView(options);

  const { data, isLoading, isError, isFetching } =
    useGetComingGamesQuery<DataType>(activeSearch, {
      skip,
    });
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
  }, [activeSearch]);

  const platformName = comingGamePlatforms.find(
    (platfrom) => platfrom.id === activeSearch
  );
  let comingContent;
  if (isLoading || isFetching) {
    comingContent = (
      <>
        {Array.from({ length: emptyCards }, (_, index) => (
          <div className={classes.emptyCard} key={index}>
            <DivLoader />
          </div>
        ))}
      </>
    );
  } else if (isError) {
    comingContent = (
      <ErrorComponent message="Page loading error. Please try again later" />
    );
  } else if (data) {
    comingContent = (
      <>
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
      <ToolBar setActiveSearch={setActiveSearch} activeSearch={activeSearch} />
      <div className={classes.wrapper__gamesContainer}>{comingContent}</div>
    </section>
  );
};

export default CommingSoon;
