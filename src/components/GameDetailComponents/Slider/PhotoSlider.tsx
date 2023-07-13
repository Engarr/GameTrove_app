import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import { FiZoomIn } from 'react-icons/fi';
import { MdZoomInMap } from 'react-icons/md';
import classes from './PhotoSlider.module.scss';
import Modal from '../../Modal/Modal';
import { GameDetailType } from '../../../Types/types';
import Spiner from '../../Spinner/Spiner';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const PhotoSlider = ({ data, isLoading, isError }: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const options = {
    threshold: 0,
    triggerOnce: true,
  };
  const { ref: locationRef, inView } = useInView(options);
  const isMediumMobile = useMediaQuery({ maxWidth: 1024 });
  const [bigIsActive, setBigIsActive] = useState(false);
  const handleNext = () => {
    setActiveIndex((prev: number) => prev + 1);
  };
  const handlePrev = () => {
    setActiveIndex((prev: number) => prev - 1);
  };
  const activeHandler = () => {
    setBigIsActive((prev) => !prev);
  };
  let content;
  if (isLoading) {
    content = (
      <div className={classes.spinnerContainer}>
        <Spiner message="Loading..." />
      </div>
    );
  } else if (isError) {
    content = (
      <div className={classes.errorContainer}>
        <h3>
          <span>Error:</span>
          There was a problem retrieving information. Try refreshing the page
        </h3>
      </div>
    );
  } else if (data && data.screenshots) {
    const screenshotsUrl = data.screenshots.map((screen) => ({
      id: screen.id,
      url: screen.url.replace('t_thumb', 't_1080p'),
    }));
    const screenShotsLength = data.screenshots.length;
    content = (
      <>
        <h2 ref={locationRef} className={`${inView && 'showUp'}`}>
          Screenshots of the game
        </h2>
        <div className={classes.screenshotsContainer}>
          {activeIndex + 2 <= screenShotsLength && (
            <button
              type="button"
              className={classes.button__next}
              onClick={handleNext}
            >
              <IoIosArrowForward />
            </button>
          )}
          {activeIndex !== 0 && (
            <button
              type="button"
              onClick={handlePrev}
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
                {activeIndex + 2 <= screenShotsLength && (
                  <button
                    type="button"
                    className={classes[`screenshotsContainer__bigImg--btnNext`]}
                    onClick={handleNext}
                  >
                    <IoIosArrowForward />
                  </button>
                )}
                {activeIndex !== 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className={classes[`screenshotsContainer__bigImg--btnPrev`]}
                  >
                    <IoIosArrowBack />
                  </button>
                )}
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
        <div className={classes.screenshotsContainer__counter}>
          <p>
            {activeIndex + 1} / <span>{screenshotsUrl.length}</span>
          </p>
        </div>
      </>
    );
  }
  return <div className={classes.photoWrapper}>{content}</div>;
};

export default PhotoSlider;
