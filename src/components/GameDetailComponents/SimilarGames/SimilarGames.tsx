import { SimilarGameType } from '../../../Types/types';
import Slider from './Slider/Slider';
import classes from './SimilarGames.module.scss';

interface PropsType {
  data: SimilarGameType[];
}

const SimilarGames = ({ data }: PropsType) => {
  return (
    <div className={classes.conatiner}>
      {data.length > 0 && <Slider data={data} />}
    </div>
  );
};

export default SimilarGames;
