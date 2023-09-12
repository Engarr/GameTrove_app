import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import classes from './VideoSlider.module.scss';
import { GameDetailType } from '../../../Types/types';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isFetching: boolean;
}

const VideoSlider = ({ data, isLoading, isFetching }: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const options = {
    threshold: 0,
    triggerOnce: true,
  };
  const { ref: locationRef, inView } = useInView(options);
  const handlePrev = () => {
    setActiveIndex((prev: number) => prev + 1);
  };
  const handleNext = () => {
    setActiveIndex((prev: number) => prev - 1);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [isFetching]);

  let content;
  if (data && !isLoading) {
    const videoIds = data.videos.map((video) => video.video_id);
    const videosUrlArr = videoIds.map((video, index) => ({
      id: index,
      url: `https://www.youtube.com/embed/${video}`,
    }));
    const videoShotsLength = videosUrlArr.length;
    content = (
      <>
        <h2 ref={locationRef} className={`${inView && 'showUp'}`}>
          Videos of the game
        </h2>
        <div className={classes.videoContainer}>
          {activeIndex + 2 <= videoShotsLength && (
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
          {videosUrlArr.map((video, index) => {
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
                key={video.id}
                className={`${classes.videoContainer__video} ${containerClasses}`}
              >
                <iframe
                  width="560"
                  height="315"
                  src={video.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return <div className={classes.videoWrapper}>{content}</div>;
};

export default VideoSlider;
