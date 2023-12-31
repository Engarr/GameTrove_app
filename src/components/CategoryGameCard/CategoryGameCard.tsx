import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import Card from './Card/Card';
import classes from './CategoryGameCard.module.scss';
import { useGetCategoryGamesQuery } from '../../store/api/feedSlice';
import { CategoryGameData } from '../../Types/types';
import bgc from '../../asset/bgc.png';
import bgcLight from '../../asset/bgc-light.png';
import { colorMode } from '../../store/slice/ThemeSlice';
import ErrorComponent from '../UI/ErrorComponent/ErrorComponent';
import CategoryGameLoader from './CategoryGameLoader/CategoryGameLoader';
import SlideDots from '../SlideDots/SlideDots';

const CategoryGameCard = () => {
  const { data, isLoading, isError, refetch } =
    useGetCategoryGamesQuery<CategoryGameData>();
  const mode = useSelector(colorMode);
  let bacgroundImg =
    'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';
  const [scrollPosition, setScrollPosition] = useState(0);
  // const [scrollXPosition, setScrollXPosition] = useState(0);
  const [activePosition, setActivePosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 736 });
  const isMediumMobile = useMediaQuery({ maxWidth: 1024 });
  let diverse = 3;
  const caruselRef = null;

  if (isMobile) {
    diverse = 1;
  } else if (isMediumMobile) {
    diverse = 2;
  }

  useEffect(() => {
    if (!isLoading && data?.newsGames.length === 0) {
      refetch();
    }
  }, [data, isLoading, refetch]);

  const handleNextClick = () => {
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      const cardWidth = containerWidth;

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
        setCurrentIndex((prev) => prev + diverse);
        setActivePosition((prev) => prev + 1);
      }
    }
  };
  const barSlider = (index: number) => {
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      setCurrentIndex(index * diverse);
      setActivePosition(index);
      setScrollPosition(containerWidth * index);
      cardsContainerRef.current.scrollTo({
        left: containerWidth * index + diverse,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;

      const cardWidth = containerWidth;
      const newScrollPosition = Math.max(scrollPosition - cardWidth, 0);

      setScrollPosition(newScrollPosition);
      cardsContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      if (currentIndex !== 0 && currentIndex < data.newsGames.length) {
        setCurrentIndex((prev) => prev - diverse);
        setActivePosition((prev) => prev - 1);
      } else if (currentIndex === 0) {
        setCurrentIndex((prev) => prev);
        setActivePosition((prev) => prev);
      }
    }
  };

  if (data && data.newsGames[currentIndex]?.cover) {
    bacgroundImg = data.newsGames[currentIndex].cover.url;
  }

  let content;
  if (isLoading || (!isLoading && data?.newsGames.length === 0)) {
    content = <CategoryGameLoader diverse={diverse} />;
  } else if (isError) {
    content = (
      <ErrorComponent message="Data loading error. Please try again later" />
    );
  } else if (data) {
    const totalCards = data.newsGames.length;
    const dotItems = Array.from({
      length: Math.ceil(totalCards / diverse),
    }).map((_, index) => ({ id: index + 1 }));

    content = (
      <div
        className={classes.container}
        style={{
          backgroundImage: `url(${bacgroundImg})`,
        }}
      >
        <img
          src={mode === 'dark' ? bgc : bgcLight}
          alt=""
          height={60}
          className={classes[`container__img--top`]}
        />
        <img
          src={mode === 'dark' ? bgc : bgcLight}
          alt=""
          height={60}
          className={classes[`container__img--bottom`]}
        />
        <div className={classes.container__shadow} />
        <div className={classes.container__carouselBox} ref={caruselRef}>
          {scrollPosition !== 0 && (
            <button
              type="button"
              className={classes.container__preBtn}
              onClick={handlePrevClick}
            >
              <IoIosArrowBack className={classes[`container__preBtn--icon`]} />
            </button>
          )}
          {currentIndex + diverse < data.newsGames.length && (
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
          <Card cardsContainerRef={cardsContainerRef} data={data} />
        </div>
        <div className={classes.rectangleBox}>
          <SlideDots
            data={dotItems}
            goToSlide={barSlider}
            currentIndex={activePosition}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__title}>
        {!isError ? (
          <>
            <div>
              <h2>
                Top games in the category:
                <span>{data ? data.category.name : ' Loading...'}</span>
              </h2>
            </div>
            <div>
              <p>According to user reviews</p>
            </div>
          </>
        ) : (
          <div />
        )}
      </div>

      {content}
    </div>
  );
};

export default CategoryGameCard;
