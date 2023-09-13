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
  // const [searchPlatform, setSearchPlatform] = useState(platform);

  const { data, isLoading, isError, isFetching, refetch } =
    useGetComingGamesQuery<DataResponseType>({
      platform,
      offset: offset.number,
    });
  const activeSearchHandler = (name: number) => {
    dispacth(setSearchPlatformHandler(name));
    setLoadedGames([]);
    refetch();
  };

  useEffect(() => {
    const handleScrollPosition = () => {
      const windowHeight = window.innerHeight;
      const { scrollY } = window;
      const distanceFromBottom =
        document.body.scrollHeight - (scrollY + windowHeight);
      if (data) {
        if (loadedGames.length >= data.totalGames?.count) {
          return;
        }
        if (distanceFromBottom === 0) {
          setOffset((prevOffset) => ({
            number: 10 * (prevOffset.count + 1),
            count: prevOffset.count + 1,
          }));
          refetch();
        }
      }
    };
    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setLoadedGames([...loadedGames, ...data.games]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let content;
  if (isLoading || isFetching) {
    content = <Spiner />;
  }
  if (loadedGames) {
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
      <ToolBar
        activeSearch={platform}
        activeSearchHandler={activeSearchHandler}
      />

      <div className={classes.gamesContainer}>{content}</div>
    </section>
  );
};

export default FutureGames;
