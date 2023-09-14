import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import { useGetBannerGamesQuery } from '../../store/api/feedSlice';
import classes from './Banner.module.scss';
import { GameType } from '../../Types/types';
import { colorMode } from '../../store/slice/ThemeSlice';
import ErrorComponent from '../UI/ErrorComponent/ErrorComponent';
import BannerLoader from './BannerLoader/BannerLoader';
import SlideDots from '../SlideDots/SlideDots';
import BannerCtx from './BannerCtx/BannerCtx';

const Banner = () => {
  const { data, isLoading, isError } = useGetBannerGamesQuery<GameType>();
  const mode = useSelector(colorMode);
  const isMediumMobile = useMediaQuery({ maxWidth: 1024 });
  const [isActive, setIsActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    content = <BannerLoader mode={mode} />;
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
          const imageSize = !isMediumMobile ? 't_1080p' : 't_720p';
          const imageUrl = item.cover.url
            .replace('t_thumb', `${imageSize}`)
            .replace('.jpg', '.webp');

          return (
            <BannerCtx
              key={item.id}
              item={item}
              index={index}
              setIsActive={setIsActive}
              imageUrl={imageUrl}
              setIsHovered={setIsHovered}
              currentIndex={currentIndex}
              mode={mode}
            />
          );
        })}
        <IoIosArrowForward
          className={classes.wrapper__arrowRight}
          onClick={handleNextBanner}
        />
        <SlideDots
          data={data}
          goToSlide={goToSlide}
          currentIndex={currentIndex}
        />
      </>
    );
  }

  return <div className={classes.wrapper}>{content}</div>;
};

export default Banner;
