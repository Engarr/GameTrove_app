import React from 'react';
import classes from './Card.module.scss';

interface PropsType {
  cardsContainerRef: React.RefObject<HTMLDivElement>;
  data: {
    newsGames: {
      id: number;
      name: string;
      cover: {
        id: number;
        url: string;
      };
      release_dates: { id: number; date: string };
      rating: number;
    }[];
  };
}

const Card = ({ cardsContainerRef, data }: PropsType) => {
  return (
    <div>
      <div className={classes.cardsContainer} ref={cardsContainerRef}>
        {data &&
          data.newsGames.map((game) => {
            const imageUrl = game.cover
              ? game.cover.url.replace('t_thumb', 't_720p')
              : '';

            return (
              <div className={classes[`cardsContainer--card`]} key={game.id}>
                {game.cover ? (
                  <img src={imageUrl} alt={game.name} width={250} />
                ) : (
                  <div>No cover image</div>
                )}
                <div className={classes[`cardsContainer--card-rating`]}>
                  {game.rating.toFixed(0)}
                </div>
                <div className={classes.shadow} />
                <div className={classes[`cardsContainer--card-name`]}>
                  {game.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
