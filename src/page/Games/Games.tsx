import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGetSpecificGamesQuery } from '../../store/api/feedSlice';
import { GameType } from '../../Types/types';

const Games = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') as string;
  const platformParam = searchParams.get('platform') as string;
  const queryParams = { category: categoryParam, platform: platformParam };

  const { data, isLoading, isError } =
    useGetSpecificGamesQuery<GameType>(queryParams);

  return <div>Games</div>;
};

export default Games;
