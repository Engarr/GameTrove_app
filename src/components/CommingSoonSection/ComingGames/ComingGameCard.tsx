import React from 'react';

import { Link } from 'react-router-dom';
import classes from './ComingGameCard.module.scss';

interface PropsType {
  name: string;
  img: string;
  date: number;
  id: number;
  platforms: {
    id: number;
    name: string;
  }[];
}

const ComingGameCard = ({ img, date, id, name, platforms }: PropsType) => {
  const imageUrl = img
    ? img.replace('t_thumb', 't_cover_big')
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgxr1R7VtfzTnb7T1xo3RWbgrPNbf3RgvJ63abVkeyzxq1gLGb50lacEnZof8bSf4h4Ww&usqp=CAU';
  const timestamp = date;
  const now = new Date();
  const releaseDate = new Date(timestamp * 1000);
  const day = releaseDate.getDate();
  const month = releaseDate.toLocaleString('en-US', { month: 'long' });
  const year = releaseDate.getFullYear();
  const timeDifference = releaseDate.getTime() - now.getTime();
  const daysDifference = Number(
    (timeDifference / (1000 * 3600 * 24)).toFixed()
  );

  return (
    <div className={classes.card}>
      <div>
        <Link to={`/game/${id}`}>
          <img src={imageUrl} alt="" width={120} height={150} loading="lazy" />
        </Link>
      </div>
      <div className={classes.card__desc}>
        <Link to={`/game/${id}`}>
          <h5>{name}</h5>
        </Link>
        <div className={classes[`card__desc--release`]}>
          {daysDifference !== 0 ? (
            <>
              <p>Planned release date:</p>
              <p>
                <span>{day}</span>-<span>{month}</span>-<span>{year}</span>
              </p>
              <p className={classes[`card__desc--release-left`]}>
                Left: <span>{daysDifference.toFixed()}</span>days
              </p>
            </>
          ) : (
            <p>Today release!</p>
          )}
        </div>
        <div className={classes[`card__desc--platforms`]}>
          <p>Platfroms:</p>
          <div>
            {platforms.map((platform) => (
              <span key={platform.id}>{platform.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingGameCard;
