import React from 'react';
import classes from './Loader.module.scss';

interface PropsType {
  message: string | undefined;
}

const Loader = ({ message }: PropsType) => {
  return (
    <div className={classes.searchLoading}>
      {message}
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};

export default Loader;
