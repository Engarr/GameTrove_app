import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGetSpecificGamesQuery } from '../../store/api/feedSlice';

const Games = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') as string;
  const platformParam = searchParams.get('platform') as string;
  const queryParams = { category: categoryParam, platform: platformParam };

  const { data, isLoading, isError } = useGetSpecificGamesQuery(queryParams);
  console.log(isLoading);
  console.log(data);
  console.log(isError);

  return <div>Games</div>;
};

export default Games;
