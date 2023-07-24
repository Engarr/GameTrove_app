import React, { useState } from 'react';
import ToolBar from './ToolBar/ToolBar';
import classes from './ComingSoon.module.scss';

const CommingSoon = () => {
  const [activeSearch, setActiveSearch] = useState('All');
  return (
    <section className={classes.wrapper}>
      <h2>
        Coming Soon to: <span>{activeSearch}</span>
      </h2>
      <ToolBar setActiveSearch={setActiveSearch} activeSearch={activeSearch} />
      {/* <div></div> */}
    </section>
  );
};

export default CommingSoon;
