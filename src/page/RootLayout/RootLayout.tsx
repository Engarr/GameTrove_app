import React from 'react';
import { Outlet } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import classes from './RootLayout.module.scss';
import NavBarLeft from '../../components/Nav/NavBarLeft/NavBarLeft';
import NavBarRight from '../../components/Nav/NavBarRight/NavBarRight';

const RootLayout = () => {
  return (
    <div className="dark">
      <div className={classes.logo}>
        <p>GameTrove</p>
        <IoGameControllerOutline className={classes.logo__icon} />
      </div>
      <NavBarLeft />
      <NavBarRight />
      <Outlet />
    </div>
  );
};

export default RootLayout;
