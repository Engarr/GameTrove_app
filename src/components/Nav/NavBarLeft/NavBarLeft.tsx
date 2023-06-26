import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import classes from './NavBarLeft.module.scss';
import Modal from '../../Modal/Modal';
import { gameCategories, gamePlatforms } from '../../../util/db';

const NavBarLeft = () => {
  const [isAcite, setIsAcite] = useState(true);
  const activeHandler = () => {
    setIsAcite((prev) => !prev);
  };
  return (
    <>
      <div className={classes.nav}>
        <div
          className={`${classes.nav__container} ${
            isAcite ? classes.active : ''
          }`}
        >
          <h3>Serach games by category:</h3>
          <div className={classes[`nav__container--categorys`]}>
            {gameCategories.map((category) => (
              <div key={category.id}>
                <button type="button">{category.category}</button>
              </div>
            ))}
          </div>
          <h3>Serach games by platform:</h3>
          <div className={classes[`nav__container--platforms`]}>
            {gamePlatforms.map((category) => (
              <div key={category.id}>
                <button type="button">{category.platform}</button>
              </div>
            ))}
          </div>

          <IoIosArrowForward
            className={`${classes.arrow} ${isAcite ? classes.arrowRotate : ''}`}
            onClick={activeHandler}
          />
        </div>
      </div>
      <Modal show={isAcite} handler={activeHandler} />
    </>
  );
};

export default NavBarLeft;
