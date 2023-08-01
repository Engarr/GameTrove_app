import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import { GameDetailType } from '../../Types/types';
import Slider from '../../components/GameDetailComponents/Slider/PhotoSlider';
import GameDetailBanner from '../../components/GameDetailComponents/GameDetailBanner';
import GameDetailDesc from '../../components/GameDetailComponents/GameDetailDesc';
import VideoSlider from '../../components/GameDetailComponents/Slider/VideoSlider';

interface DataType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const GameDetail = () => {
  const param = useParams<{ gameId: string }>();

  const { gameId } = param;

  const { data, isLoading, isError } = useGetGameDetailsQuery<DataType>(
    gameId as string
  );

  return (
    <section className={classes.detailWrapper}>
      <GameDetailBanner data={data} isLoading={isLoading} isError={isError} />
      <GameDetailDesc data={data} isLoading={isLoading} />
      <Slider data={data} isLoading={isLoading} isError={isError} />
      {data && data.videos && <VideoSlider data={data} isLoading={isLoading} />}
    </section>
  );
};

export default GameDetail;
