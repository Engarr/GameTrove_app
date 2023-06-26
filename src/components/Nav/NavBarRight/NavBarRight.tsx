import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { PiUserPlusFill, PiUserFill } from 'react-icons/pi';
import classes from './NavBarRight.module.scss';

const NavBarRight = () => {
  const [isAcite, setIsAcite] = useState(false);
  const activeHandler = () => {
    setIsAcite((prev) => !prev);
  };
  return (
    <div className={classes.nav}>
      <div
        className={`${classes.nav__container} ${isAcite ? classes.active : ''}`}
      >
        <div className={classes.nav__buttons}>
          <div>
            <button type="button">
              Login
              <PiUserFill className={classes[`nav__buttons--icon`]} />
            </button>
          </div>
          <div>
            <button type="button">
              Join us
              <PiUserPlusFill className={classes[`nav__buttons--icon`]} />
            </button>
          </div>
        </div>
        <IoIosArrowUp
          className={`${classes.arrow} ${isAcite ? classes.arrowRotate : ''}`}
          onClick={activeHandler}
        />
      </div>
    </div>
  );
};

export default NavBarRight;
