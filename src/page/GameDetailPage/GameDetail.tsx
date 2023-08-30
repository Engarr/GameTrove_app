import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import { GameDetailType } from '../../Types/types';
import Slider from '../../components/GameDetailComponents/Slider/PhotoSlider';
import GameDetailBanner from '../../components/GameDetailComponents/GameDetailBanner/GameDetailBanner';
import GameDetailDesc from '../../components/GameDetailComponents/GameDetalDesc/GameDetailDesc';
import VideoSlider from '../../components/GameDetailComponents/Slider/VideoSlider';

interface SimilarGameType {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  name: string;
}

interface DataType {
  data: {
    gameDetails: GameDetailType;
    similarGamesInfo: SimilarGameType;
  };
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
      <GameDetailBanner
        data={data?.gameDetails}
        isLoading={isLoading}
        isError={isError}
      />
      <GameDetailDesc data={data?.gameDetails} isLoading={isLoading} />
      <Slider
        data={data?.gameDetails}
        isLoading={isLoading}
        isError={isError}
      />
      {data && data.gameDetails.videos && (
        <VideoSlider data={data?.gameDetails} isLoading={isLoading} />
      )}
    </section>
  );
};

export default GameDetail;
