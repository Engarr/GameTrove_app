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
  summary: string;
  platforms: {
    id: number;
    name: string;
  }[];
}

const GameCard = ({ name, img, id, geners, summary, platforms }: PropsType) => {
  const newImg = img.replace('t_thumb', 't_1080p');
  return (
    <div className={classes.card}>
      <Link to={`/game/${id}`}>
        <div className={classes.card__img}>
          <img src={newImg} alt={name} width={400} height={190} />
        </div>
      </Link>
      <div className={classes.card__descContainer}>
        <Link to={`/game/${id}`}>
          <h2>{name}</h2>
        </Link>
        {geners && (
          <div className={classes.card__geners}>
            <p> Geners:</p>
            {geners.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
        )}
        {platforms && (
          <div className={classes.card__geners}>
            <p> Platfomrs:</p>
            {platforms.map((p) => (
              <span key={p.id}>{p.name}</span>
            ))}
          </div>
        )}
        {summary && (
          <div className={classes.card__summary}>
            <p>
              {summary.substring(0, 90)}...
              <Link to={`/game/${id}`}>Read more</Link>{' '}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
