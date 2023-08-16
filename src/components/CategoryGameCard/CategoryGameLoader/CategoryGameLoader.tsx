import React from 'react';
import classes from './CategoryGameLoader.module.scss';
import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';

interface PropsType {
  diverse: number;
}

const CategoryGameLoader = ({ diverse }: PropsType) => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingContainer__cardBox}>
        {Array.from({ length: diverse }, (_, index) => (
          <div className={classes.loadingContainer__emptyCard} key={index}>
            <DivLoader />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGameLoader;
