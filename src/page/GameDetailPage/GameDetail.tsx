import { useParams } from 'react-router-dom';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import { GameDetailType } from '../../Types/types';
import Slider from '../../components/Slider/Slider';
import GameDetailBanner from '../../components/GameDetailComponents/GameDetailBanner';
import GameDetailDesc from './GameDetailDesc';

interface DataType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const GameDetail = () => {
  const param = useParams();
  const { gameId } = param;

  const { data, isLoading, isError } = useGetGameDetailsQuery<DataType>(
    gameId as string
  );

  return (
    <section className={classes.detailWrapper}>
      <GameDetailBanner data={data} isLoading={isLoading} isError={isError} />
      <GameDetailDesc data={data} isLoading={isLoading} />
      <Slider data={data} isLoading={isLoading} isError={isError} />;
    </section>
  );
};

export default GameDetail;
