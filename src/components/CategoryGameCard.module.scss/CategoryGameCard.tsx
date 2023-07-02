import { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import classes from './CategoryGameCard.module.scss';
import { useGetNewCategoryGamesQuery } from '../../store/api/feedSlice';
import { CategoryGameData } from '../../Types/types';
import Spiner from '../Spinner/Spiner';

const CategoryGameCard = () => {
  const { data, isLoading, isError } =
    useGetNewCategoryGamesQuery<CategoryGameData>();
  let bacgroundImg =
    'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  let divisor;
  const handleNextClick = () => {
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      divisor = isMobile ? 1 : 3;

      const cardWidth = containerWidth / divisor;

      const maxScrollPosition =
        cardsContainerRef.current.scrollWidth - containerWidth;
      const newScrollPosition = Math.min(
        scrollPosition + cardWidth,
        maxScrollPosition
      );

      setScrollPosition(newScrollPosition);
      cardsContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      if (currentIndex < data.newsGames.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const handlePrevClick = () => {
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      divisor = isMobile ? 1 : 3;
      const cardWidth = containerWidth / divisor;
      const newScrollPosition = Math.max(scrollPosition - cardWidth, 0);

      setScrollPosition(newScrollPosition);
      cardsContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      if (currentIndex !== 0 && currentIndex < data.newsGames.length) {
        setCurrentIndex((prev) => prev - 1);
      } else if (currentIndex === 0) {
        setCurrentIndex((prev) => prev);
      }
    }
  };

  if (data && data.newsGames[currentIndex].cover) {
    bacgroundImg = data.newsGames[currentIndex].cover.url.replace(
      't_thumb',
      't_1080p'
    );
  }

  let content;
  if (isLoading) {
    content = (
      <div className={classes.spinnerContainer}>
        <Spiner message="Loading" />
      </div>
    );
  } else if (isError) {
    content = (
      <h3>
        Error: There was a problem retrieving information. Try refreshing the
        page
      </h3>
    );
  } else if (data) {
    content = (
      <div
        className={classes.container}
        style={{ backgroundImage: `url(${bacgroundImg})` }}
      >
        <div className={classes.container__shadow} />
        <div className={classes.container__carouselBox}>
          {scrollPosition !== 0 && (
            <button
              type="button"
              className={classes.container__preBtn}
              onClick={handlePrevClick}
            >
              <IoIosArrowBack className={classes[`container__preBtn--icon`]} />
            </button>
          )}
          {currentIndex !== data.newsGames.length && (
            <button
              type="button"
              className={classes.container__nextBtn}
              onClick={handleNextClick}
            >
              <IoIosArrowForward
                className={classes[`container__nextBtn--icon`]}
              />
            </button>
          )}

          <div
            className={classes.container__cardsContainer}
            ref={cardsContainerRef}
          >
            {data.newsGames.map((game) => {
              const imageUrl = game.cover
                ? game.cover.url.replace('t_thumb', 't_720p')
                : '';

              return (
                <div
                  className={classes[`container__cardsContainer--card`]}
                  key={game.id}
                >
                  {game.cover ? (
                    <img src={imageUrl} alt={game.name} width={250} />
                  ) : (
                    <div>No cover image</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__title}>
        <h2>
          Game news in the category:
          <span>{data ? data.category.name : ' Loading...'}</span>
        </h2>
      </div>

      {content}
    </div>
  );
};

export default CategoryGameCard;
