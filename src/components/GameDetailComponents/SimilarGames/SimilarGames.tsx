import React from 'react';
import { SimilarGameType } from '../../../Types/types';
import Slider from './Slider/Slider';

interface PropsType {
  data: SimilarGameType[];
}

const SimilarGames = ({ data }: PropsType) => {
  return (
    <div>
      {data.length > 0 && (
        <>
          <h2>Similar Games:</h2>
          <Slider data={data} />
        </>
      )}
    </div>
  );
};

export default SimilarGames;
