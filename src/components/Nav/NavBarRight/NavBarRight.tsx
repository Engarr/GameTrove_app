import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
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
        <div>
          <p>test</p>
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
