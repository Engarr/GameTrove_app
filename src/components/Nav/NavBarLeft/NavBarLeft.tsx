import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import classes from './NavBarLeft.module.scss';

const NavBarLeft = () => {
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
        <IoIosArrowForward
          className={`${classes.arrow} ${isAcite ? classes.arrowRotate : ''}`}
          onClick={activeHandler}
        />
      </div>
    </div>
  );
};

export default NavBarLeft;
