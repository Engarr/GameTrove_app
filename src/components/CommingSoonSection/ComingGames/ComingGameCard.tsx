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
    ? img.replace('t_thumb', 't_1080p')
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
          <img src={imageUrl} alt="" width={150} />
        </Link>
      </div>
      <div className={classes.card__desc}>
        <h5>{name}</h5>
        <div>
          {daysDifference !== 0 ? (
            <>
              <p>Planned release date:</p>
              <span>
                {day}-{month}-{year}
              </span>
              <p>Left:{daysDifference.toFixed()} days</p>
            </>
          ) : (
            <p>Today release!</p>
          )}
        </div>
        <div>
          <p>Platfroms:</p>
          {platforms.map((platform) => (
            <p key={platform.id}>{platform.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingGameCard;
