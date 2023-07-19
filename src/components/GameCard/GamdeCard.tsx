import React from 'react';
import { Link } from 'react-router-dom';
import classes from './GameCard.module.scss';

interface PropsType {
  name: string;
  img: string;
  id: number;
}

const GamdeCard = ({ name, img, id }: PropsType) => {
  const newImg = img.replace('t_thumb', 't_720p');
  return (
    <div className={classes.card}>
      <Link to={`/game/${id}`}>
        <div className={classes.card__img}>
          <img src={newImg} alt={name} width={400} height={190} />
        </div>
      </Link>
      <Link to={`/game/${id}`}>
        <p>{name}</p>
      </Link>
    </div>
  );
};

export default GamdeCard;
