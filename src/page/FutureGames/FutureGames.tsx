import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './FutureGames.module.scss';
import { useGetComingGamesQuery } from '../../store/api/feedSlice';
import { DataResponseType } from '../../components/CommingSoonSection/CommingSoon';
import ComingGameCard from '../../components/CommingSoonSection/ComingGames/ComingGameCard';
import ToolBar from '../../components/CommingSoonSection/ToolBar/ToolBar';
import {
  SearchPlatform,
  setSearchPlatformHandler,
} from '../../store/slice/UiSLice';
import Spiner from '../../components/UI/Spinner/Spiner';
import { comingGamePlatforms } from '../../util/db';
import ErrorComponent from '../../components/UI/ErrorComponent/ErrorComponent';
import EmptyList from '../../components/Tabs/WishlistTab/EmptyList/EmptyList';

interface LoadedGamesType {
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
}

const FutureGames = () => {
  const platform = useSelector(SearchPlatform);
  const dispacth = useDispatch();
  const [offset, setOffset] = useState({ number: 0, count: 0 });
  const [loadedGames, setLoadedGames] = useState<LoadedGamesType[]>([]);
  const { data, isLoading, isError, isFetching, refetch } =
    useGetComingGamesQuery<DataResponseType>({
      platform,
      offset: offset.number,
      limit: 40,
    });

  const activeSearchHandler = (name: number) => {
    dispacth(setSearchPlatformHandler(name));
    setLoadedGames([]);
    setOffset({ number: 0, count: 0 });
    refetch();
  };

  useEffect(() => {
    const handleScrollPosition = async () => {
      const windowHeight = window.innerHeight;
      const { scrollY } = window;
      const distanceFromBottom =
        document.body.scrollHeight - (scrollY + windowHeight);

      if (distanceFromBottom === 0) {
        if (data && data.totalGames.count === loadedGames.length) {
          return;
        }
        setOffset((prevOffset) => ({
          number: 40 * (prevOffset.count + 1),
          count: prevOffset.count + 1,
        }));
        await refetch();
      }
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, loadedGames.length]);

  useEffect(() => {
    if (data) {
      setLoadedGames([...loadedGames, ...data.games]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let content;
  if (isLoading || isFetching) {
    content = (
      <div className={classes.spinerBox}>
        <Spiner message="Fetching data" />
      </div>
    );
  }
  if (isError) {
    content = (
      <div className={classes.errorBox}>
        <ErrorComponent
          message="Something went wrong, could not fetch the data."
          messageTwo="Please try again later"
        />
      </div>
    );
  }
  if (loadedGames.length === 0 && !isFetching && !isLoading) {
    content = (
      <div className={classes.emptyBox}>
        <EmptyList
          message="We couldn't find any upcoming games"
          messageTwo="check anodther platforms"
        />
      </div>
    );
  }
  if (loadedGames.length !== 0) {
    content = (
      <>
        {loadedGames.map((game) => (
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
    <section className={classes.wrapper}>
      <div className={classes.toolBarBox}>
        <ToolBar
          activeSearch={platform}
          activeSearchHandler={activeSearchHandler}
        />
      </div>

      <div className={classes.gamesContainer}>
        {content}
        {isFetching && loadedGames.length !== 0 && (
          <div className={classes.spinerBox}>
            <Spiner message="Fetching more games" />
          </div>
        )}
      </div>
      {data && data.totalGames.count === loadedGames.length && (
        <p className={classes.noMoreGames}>There is no more upcoming games</p>
      )}
    </section>
  );
};

export default FutureGames;
