import { SimilarGameType } from '../../../Types/types';
import Slider from './Slider/Slider';

interface PropsType {
  data: SimilarGameType[];
}

const SimilarGames = ({ data }: PropsType) => {
  return <div>{data.length > 0 && <Slider data={data} />}</div>;
};

export default SimilarGames;
