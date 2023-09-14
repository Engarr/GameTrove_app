import { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './BannerCtx.module.scss';
import Card from '../Card/Card';
import bgc from '../../../asset/bgc.png';
import bgcLight from '../../../asset/bgc-light.png';

interface PropsType {
  item: {
    id: number;
    aggregated_rating: number;
    aggregated_rating_count: number;
    name: string;
  };
  index: number;
  mode: string;
  currentIndex: number;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BannerCtx = ({
  item,
  index,
  mode,
  currentIndex,
  setIsHovered,
  imageUrl,
  setIsActive,
}: PropsType) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bacgroundImg = imageUrl.replace('t_1080p', 't_720p');
  return (
    <div
      key={item.id}
      className={`${classes.banner} 
            ${
              index === currentIndex
                ? classes.activeBaner
                : classes.inactiveBanner
            }
            `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundImage: `url(${bacgroundImg})` }}
    >
      <div className={classes.banner__shadow} />
      <img
        src={mode === 'dark' ? bgc : bgcLight}
        alt=""
        height={20}
        className={classes.banner__img}
      />
      <div className={classes.banner__content} ref={cardRef}>
        <div className={classes.banner__rec}>
          <p>recommended</p>
        </div>

        <Card
          imageUrl={imageUrl}
          cardId={index}
          setIsActive={setIsActive}
          gameId={item.id}
        />

        <div className={classes[`banner__content--infoBox`]}>
          <div className={classes[`banner__content--infoBox-rating`]}>
            <p>{item.aggregated_rating.toFixed(0)}</p>
            <span>Based on {item.aggregated_rating_count} critic ratings</span>
          </div>
          <div className={classes[`banner__content--infoBox-name`]}>
            <p>{item.name}</p>

            <button type="button">
              <Link to={`/game/${item.id}`}>Read more</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCtx;
