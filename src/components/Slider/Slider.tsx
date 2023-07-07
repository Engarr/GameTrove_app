import { SetStateAction } from 'react';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import classes from './Slider.module.scss';

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
  const handlePrev = () => {
    setActiveIndex((prev: number) => prev + 1);
  };
  const handleNext = () => {
    setActiveIndex((prev: number) => prev - 1);
  };
  return (
    <div className={classes.screenshotsContainer}>
      {activeIndex + 2 <= screenShotsLength && (
        <button
          type="button"
          onClick={handlePrev}
          className={classes.button__prev}
        >
          <IoIosArrowForward />
        </button>
      )}
      {activeIndex !== 0 && (
        <button
          type="button"
          onClick={handleNext}
          className={classes.button__next}
        >
          <IoIosArrowBack />
        </button>
      )}
      {screenshotsUrl.map((screen, index) => {
        let containerClasses = classes.inactive;

        if (index === activeIndex) {
          containerClasses = classes.centerImgActive;
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
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
