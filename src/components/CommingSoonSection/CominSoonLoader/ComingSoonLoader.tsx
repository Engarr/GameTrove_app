import React from 'react';
import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';
import classes from './ComingSoonLoader.module.scss';

const ComingSoonLoader = () => {
  const emptyCards = 6;
  return (
    <>
      {Array.from({ length: emptyCards }, (_, index) => (
        <div className={classes.emptyCard} key={index}>
          <div className={classes.emptyCard__img}>
            <DivLoader />
          </div>
          <div className={classes.emptyCard__textBox}>
            <div className={classes[`emptyCard__textBox--text`]}>
              <DivLoader />
            </div>
            <div className={classes[`emptyCard__textBox--text`]}>
              <DivLoader />
            </div>
            <div className={classes[`emptyCard__textBox--text`]}>
              <DivLoader />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ComingSoonLoader;
