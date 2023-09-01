import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import { GameDetailType, SimilarGameType } from '../../Types/types';
import PhotoSlider from '../../components/GameDetailComponents/Slider/PhotoSlider';
import GameDetailBanner from '../../components/GameDetailComponents/GameDetailBanner/GameDetailBanner';
import GameDetailDesc from '../../components/GameDetailComponents/GameDetalDesc/GameDetailDesc';
import VideoSlider from '../../components/GameDetailComponents/Slider/VideoSlider';
import SimilarGames from '../../components/GameDetailComponents/SimilarGames/SimilarGames';

interface DataType {
  data: {
    gameDetails: GameDetailType;
    similarGamesInfo: SimilarGameType[];
  };
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

const GameDetail = () => {
  const param = useParams<{ gameId: string }>();
  const { gameId } = param;

  const { data, isLoading, isError, isFetching } =
    useGetGameDetailsQuery<DataType>(gameId as string);

  return (
    <section className={classes.detailWrapper}>
      <GameDetailBanner
        data={data?.gameDetails}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />
      <GameDetailDesc
        data={data?.gameDetails}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <PhotoSlider
        data={data?.gameDetails}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />
      {!isFetching && (
        <>
          {data && data.gameDetails.videos && (
            <VideoSlider data={data?.gameDetails} isLoading={isLoading} />
          )}
          {data && data.similarGamesInfo.length > 0 && (
            <SimilarGames data={data.similarGamesInfo} />
          )}
        </>
      )}
    </section>
  );
};

export default GameDetail;
