import React from 'react';
import classes from './Loader.module.scss';

interface PropsType {
  message: string | undefined;
  color: string;
}

const Loader = ({ message, color }: PropsType) => {
  return (
    <div className={classes.searchLoading} style={{ color: `${color}` }}>
      {message}
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};

export default Loader;
