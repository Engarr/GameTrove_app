import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useGetBannerGamesQuery } from '../../store/api/feedSlice';
import classes from './Banner.module.scss';
import Spiner from '../Spinner/Spinner/Spiner';
import Card from './Card/Card';
import { GameType } from '../../Types/types';
import bgc from '../../asset/bgc.png';
import bgcLight from '../../asset/bgc-light.png';
import { colorMode } from '../../store/slice/ThemeSlice';
import ErrorComponent from '../Spinner/ErrorComponent/ErrorComponent';
import DivLoader from '../Spinner/SkeletonDivLoader/DivLoader';

const Banner = () => {
  const { data, isLoading, isError } = useGetBannerGamesQuery<GameType>();
  const mode = useSelector(colorMode);

  const [isActive, setIsActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isHovered) {
      setIsActive(false);
    }
    if (!isHovered) {
      setIsActive(true);
    }
    if (isActive) {
      interval = setInterval(changeBanner, 5000);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isHovered]);

  let content;
  if (isLoading) {
    content = (
      <div className={classes.loadingBox}>
        <DivLoader />
        <div className={classes.loadingBox__spinner} />
        <div className={classes.loadingBox__card}>
          <DivLoader />
        </div>
        <img
          src={mode === 'dark' ? bgc : bgcLight}
          alt=""
          height={20}
          className={classes.banner__img}
        />
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorComponent message="Data loading error. Please try again later" />
    );
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ backgroundImage: `url(${imageUrl})` }}
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
                />

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
