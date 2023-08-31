import { Link } from 'react-router-dom';
import { SimilarGameType } from '../../../../Types/types';
import classes from './Slider.module.scss';

interface PropsType {
  data: SimilarGameType[];
}

const Slider = ({ data }: PropsType) => {
  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderContainer__cardsBox}>
        {data.map((game) => {
          let imageUrl =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&usqp=CAU';
          if (game.cover && game.cover.url) {
            imageUrl = game.cover.url.replace('t_thumb', 't_720p');
          }
          return (
            <div key={game.id} className={classes.sliderContainer__card}>
              <Link to={`/game/${game.id}`}>{game.name}</Link>
              <img src={imageUrl} alt={game.name} />
            </div>
          );
        })}
        {data.map((game) => {
          let imageUrl =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&usqp=CAU';
          if (game.cover && game.cover.url) {
            imageUrl = game.cover.url.replace('t_thumb', 't_720p');
          }
          return (
            <div key={game.id} className={classes.sliderContainer__card}>
              <Link to={`/game/${game.id}`}>{game.name}</Link>
              <img src={imageUrl} alt={game.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
