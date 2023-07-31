import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import { GameDetailType } from '../../Types/types';
import Slider from '../../components/GameDetailComponents/Slider/PhotoSlider';
import GameDetailBanner from '../../components/GameDetailComponents/GameDetailBanner';
import GameDetailDesc from '../../components/GameDetailComponents/GameDetailDesc';
import VideoSlider from '../../components/GameDetailComponents/Slider/VideoSlider';
import { useGetUserIdQuery } from '../../store/api/userSlice';

interface DataType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}
interface UserIdType {
  data: {
    userId: string;
  };
  isLoading: boolean;
}

const GameDetail = () => {
  const token = useRouteLoaderData('root') as string;
  const param = useParams<{ gameId?: string }>();
  const { gameId } = param;
  const [skip, setSkip] = useState(true);
  let userId = null;

  const { data, isLoading, isError } = useGetGameDetailsQuery<DataType>(
    gameId as string
  );
  const { data: userData, isLoading: userDataLoading } =
    useGetUserIdQuery<UserIdType>(token, {
      skip,
    });
  useEffect(() => {
    if (token) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [token]);

  if (userData && !userDataLoading) {
    userId = userData.userId;
  }

  return (
    <section className={classes.detailWrapper}>
      <GameDetailBanner
        data={data}
        isLoading={isLoading}
        isError={isError}
        userId={userId}
      />
      <GameDetailDesc data={data} isLoading={isLoading} />
      <Slider data={data} isLoading={isLoading} isError={isError} />
      {data && data.videos && <VideoSlider data={data} isLoading={isLoading} />}
    </section>
  );
};

export default GameDetail;
