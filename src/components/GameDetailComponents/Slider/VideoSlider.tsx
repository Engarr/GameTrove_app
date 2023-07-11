import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import classes from './VideoSlider.module.scss';
import { GameDetailType } from '../../../Types/types';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const VideoSlider = ({ data, isLoading, isError }: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrev = () => {
    setActiveIndex((prev: number) => prev + 1);
  };
  const handleNext = () => {
    setActiveIndex((prev: number) => prev - 1);
  };
  let content;

  if (data && !isLoading) {
    const videoIds = data.videos.map((video) => video.video_id);
    const videosUrlArr = videoIds.map((video, index) => ({
      id: index,
      url: `https://www.youtube.com/embed/${video}`,
    }));
    const videoShotsLength = videosUrlArr.length;
    content = (
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
    );
  }
  return (
    <div className={classes.videoWrapper}>
      <h2>Videos of the game</h2>
      {content}
    </div>
  );
};

export default VideoSlider;
