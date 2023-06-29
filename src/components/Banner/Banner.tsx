import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useGetBannerGamesQuery } from '../../store/api/feedSlice';
import classes from './Banner.module.scss';
import Spiner from '../Spinner/Spiner';
import Card from './Card/Card';

interface DataType {
  data: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    first_release_date: number;
    release_dates: { id: number; date: string }[];
    aggregated_rating: number;
    aggregated_rating_count: number;
  }[];
  isLoading: boolean;
  isError: boolean;
}
const Banner = () => {
  const { data, isLoading, isError } = useGetBannerGamesQuery<DataType>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  const handleNextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };
  const changeBanner = () => {
    if (data && currentIndex >= data.length) {
      setCurrentIndex(0);
    } else if (data) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(changeBanner, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, data]);

  let content;
  if (isLoading) {
    content = <Spiner message="Loading..." />;
  } else if (isError) {
    content = <div>ERROR</div>;
  } else if (data) {
    content = (
      <>
        <IoIosArrowBack
          className={classes.wrapper__arrowLeft}
          onClick={handlePrevBanner}
        />
        {data.map((item, index) => {
          const imageUrl = item.cover.url.replace('t_thumb', 't_1080p');

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
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className={classes.banner__shadow} />
              <div className={classes.banner__content} ref={cardRef}>
                <div className={classes.banner__rec}>
                  <p>recommended</p>
                </div>

                <Card imageUrl={imageUrl} cardId={index} />

                <div className={classes[`banner__content--infoBox`]}>
                  <div className={classes[`banner__content--infoBox-rating`]}>
                    <p>{item.aggregated_rating.toFixed(0)}</p>
                    <span>
                      Based on {item.aggregated_rating_count} critic ratings
                    </span>
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
        })}
        <IoIosArrowForward
          className={classes.wrapper__arrowRight}
          onClick={handleNextBanner}
        />

        <div className={classes.dotBox}>
          {data.map((item, slideIndex) => (
            <div
              key={item.id}
              onClick={() => goToSlide(slideIndex)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  goToSlide(slideIndex);
                }
              }}
              role="button"
              tabIndex={0}
              className={slideIndex === currentIndex ? classes.activeDot : ''}
            >
              ●
            </div>
          ))}
        </div>
      </>
    );
  }

  return <div className={classes.wrapper}>{content}</div>;
};

export default Banner;
