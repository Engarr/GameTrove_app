import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsSearch } from 'react-icons/bs';
import NavBarLeft from '../NavBarLeft/NavBarLeft';
import NavBarRight from '../NavBarRight/NavBarRight';
import classes from './Nav.module.scss';

const Nav = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  const [isActiveRightBar, setIsActiveRightBar] = useState(false);
  const [isHide, setIsHide] = useState(true);
  return (
    <div>
      <div className={classes.navBarBox}>
        <div className={classes.navBarBox__logo}>
          <Link
            to="/"
            onClick={() => {
              setIsActiveLeftBar(false);
              setIsActiveRightBar(false);
            }}
          >
            <p>GameTrove</p>
            <IoGameControllerOutline
              className={classes[`navBarBox__logo--icon`]}
            />
          </Link>
        </div>
        <div className={classes.navBarBox__search}>
          <BsSearch
            className={classes[`navBarBox__search--icon`]}
            onClick={() => setIsHide((prev) => !prev)}
          />
          <div
            className={`${classes[`navBarBox__search--inputBox`]} ${
              isHide ? classes.hide : classes.show
            }`}
          >
            <input placeholder="Search.." />
          </div>
        </div>
      </div>
      <NavBarLeft
        isActiveRightBar={isActiveRightBar}
        setIsActiveRightBar={setIsActiveRightBar}
        isActiveLeftBar={isActiveLeftBar}
        setIsActiveLeftBar={setIsActiveLeftBar}
      />
      <NavBarRight
        isActiveRightBar={isActiveRightBar}
        setIsActiveRightBar={setIsActiveRightBar}
        isActiveLeftBar={isActiveLeftBar}
        setIsActiveLeftBar={setIsActiveLeftBar}
      />
    </div>
  );
};

export default Nav;