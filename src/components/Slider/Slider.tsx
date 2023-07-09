import { SetStateAction, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FiZoomIn } from 'react-icons/fi';
import { MdZoomInMap } from 'react-icons/md';
import classes from './Slider.module.scss';
import Modal from '../Modal/Modal';

interface PropsType {
  activeIndex: number;
  screenShotsLength: number;
  setActiveIndex: React.Dispatch<SetStateAction<number>>;
  screenshotsUrl: { id: number; url: string }[];
}

const Slider = ({
  activeIndex,
  screenShotsLength,
  setActiveIndex,
  screenshotsUrl,
}: PropsType) => {
  const isMediumMobile = useMediaQuery({ maxWidth: 1024 });
  const [bigIsActive, setBigIsActive] = useState(false);
  const handlePrev = () => {
    setActiveIndex((prev: number) => prev + 1);
  };
  const handleNext = () => {
    setActiveIndex((prev: number) => prev - 1);
  };
  const activeHandler = () => {
    setBigIsActive((prev) => !prev);
  };
  console.log(isMediumMobile);
  return (
    <div className={classes.screenshotsContainer}>
      {activeIndex + 2 <= screenShotsLength && (
        <button
          type="button"
          className={classes.button__next}
          onClick={handlePrev}
        >
          <IoIosArrowForward />
        </button>
      )}
      {activeIndex !== 0 && (
        <button
          type="button"
          onClick={handleNext}
          className={classes.button__prev}
        >
          <IoIosArrowBack />
        </button>
      )}
      {screenshotsUrl.map((screen, index) => {
        let containerClasses = classes.inactive;
        let zoomkHandler;
        if (index === activeIndex) {
          containerClasses = classes.centerImgActive;
          zoomkHandler = activeHandler;
        } else if (index === activeIndex + 1) {
          containerClasses = classes.rightImgNext;
        } else if (index === activeIndex - 1) {
          containerClasses = classes.leftImgPrev;
        }

        return (
          <div
            key={screen.id}
            className={`${classes.screenshotsContainer__box} ${containerClasses}`}
          >
            <img src={screen.url} alt={`screenshot_${screen.id}`} />
            {index === activeIndex && !isMediumMobile && (
              <button
                type="button"
                onClick={zoomkHandler}
                className={classes.screenshotsContainer__zoom}
              >
                <FiZoomIn />
              </button>
            )}
          </div>
        );
      })}
      {bigIsActive && (
        <>
          <Modal show={bigIsActive} handler={activeHandler} />
          <div className={classes.screenshotsContainer__bigImg}>
            <img src={screenshotsUrl[activeIndex].url} alt="" />
            <button
              type="button"
              onClick={activeHandler}
              className={classes.screenshotsContainer__zoom}
            >
              <MdZoomInMap />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
