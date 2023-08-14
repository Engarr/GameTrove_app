import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './GameCard.module.scss';
import { switchPage } from '../../../store/slice/PaginationSlice';

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
  const dispatch = useDispatch();
  const resetPageHandler = () => {
    dispatch(switchPage(1));
  };

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
              <Link
                to={`/games?category=${g.id}`}
                key={g.id}
                onClick={resetPageHandler}
              >
                {g.name}
              </Link>
            ))}
          </div>
        )}
        {platforms && (
          <div className={classes.card__geners}>
            <p> Platfomrs:</p>
            {platforms.map((p) => (
              <Link
                to={`/games?platform=${p.id}&page=1`}
                key={p.id}
                onClick={resetPageHandler}
              >
                {p.name}
              </Link>
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
