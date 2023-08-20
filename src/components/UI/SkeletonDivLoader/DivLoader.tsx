import React from 'react';
import classes from './DivLoader.module.scss';

const DivLoader = () => {
  return (
    <div className={classes.loadingDiv}>
      <div className={classes.loadingDiv__shadow} />
    </div>
  );
};

export default DivLoader;
