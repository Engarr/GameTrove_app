import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { useGetUserWishlistQuery } from '../../../store/api/userSlice';

interface UserWislistType {
  data: {
    userWislist: number[];
  };
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}
interface PropsType {
  skipSearch: boolean;
}

const WishlistTaba = ({ skipSearch }: PropsType) => {
  const token = useRouteLoaderData('root') as string;

  const { data, isLoading, isFetching } =
    useGetUserWishlistQuery<UserWislistType>(token, {
      refetchOnMountOrArgChange: true,
      skip: skipSearch,
    });
  // console.log(isLoading);
  // console.log(data);
  // console.log(isFetching);
  return <div>WishlistTaba</div>;
};

export default WishlistTaba;
