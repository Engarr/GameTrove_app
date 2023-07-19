import React from 'react';
import { Link } from 'react-router-dom';
import classes from './GameCard.module.scss';

interface PropsType {
  name: string;
  img: string;
  id: number;
  geners: {
    id: number;
    name: string;
  }[];
}

const GamdeCard = ({ name, img, id, geners }: PropsType) => {
  const newImg = img.replace('t_thumb', 't_1080p');
  return (
    <div className={classes.card}>
      <Link to={`/game/${id}`}>
        <div className={classes.card__img}>
          <img src={newImg} alt={name} width={400} height={190} />
        </div>
      </Link>
      <div>
        <Link to={`/game/${id}`}>
          <h2>{name}</h2>
        </Link>
        {geners && (
          <div>
            Geners:
            {geners.map((g) => (
              <p key={g.id}>{g.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamdeCard;
