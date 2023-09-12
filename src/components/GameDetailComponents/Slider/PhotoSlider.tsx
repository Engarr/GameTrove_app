import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import { FiZoomIn } from 'react-icons/fi';
import { MdZoomInMap } from 'react-icons/md';
import classes from './PhotoSlider.module.scss';
import Modal from '../../Modal/Modal';
import { GameDetailType } from '../../../Types/types';
import ErrorComponent from '../../UI/ErrorComponent/ErrorComponent';
import LoadingContext from './LoadingContext';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

const PhotoSlider = ({ data, isLoading, isError, isFetching }: PropsType) => {
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
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      activeHandler();
    }
  };
  useEffect(() => {
    setActiveIndex(0);
  }, [isFetching]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let content;

  if (isLoading || isFetching) {
    content = <LoadingContext />;
  } else if (isError) {
    content = (
      <ErrorComponent message="Data loading error. Please try again later" />
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
          Screenshots:
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
              <Modal
                show={bigIsActive}
                handler={activeHandler}
                zIndexNumber="90"
              />
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
                <img
                  src={screenshotsUrl[activeIndex].url}
                  alt="game_screenshot"
                />
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
