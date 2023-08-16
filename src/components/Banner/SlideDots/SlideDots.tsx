import React from 'react';
import classes from './SlideDots.module.scss';

interface PropsType {
  data: {
    id: number;
  }[];
  goToSlide: (slideIndex: number) => void;
  currentIndex: number;
}

const SlideDots = ({ data, goToSlide, currentIndex }: PropsType) => {
  return (
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
  );
};

export default SlideDots;
