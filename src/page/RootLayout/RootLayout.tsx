import React from 'react';
import { useGetGamesQuery } from '../../store/api/feedSlice';

const RootLayout = () => {
  const { data } = useGetGamesQuery();
  console.log(data);

  return <div>RootLayout</div>;
};

export default RootLayout;
