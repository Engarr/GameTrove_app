import { IoIosArrowUp } from 'react-icons/io';
import { PiUserPlusFill, PiUserFill } from 'react-icons/pi';
import classes from './NavBarRight.module.scss';
import Modal from '../../Modal/Modal';

interface PropsType {
  isActiveRightBar: boolean;
  setIsActiveRightBar: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBarRight = ({ isActiveRightBar, setIsActiveRightBar }: PropsType) => {
  const activeHandler = () => {
    setIsActiveRightBar((prev) => !prev);
  };
  return (
    <>
      <div className={classes.nav}>
        <div
          className={`${classes.nav__container} ${
            isActiveRightBar ? classes.active : ''
          }`}
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
            className={`${classes.arrow} ${
              isActiveRightBar ? classes.arrowRotate : ''
            }`}
            onClick={activeHandler}
          />
        </div>
      </div>
      <Modal show={isActiveRightBar} handler={activeHandler} />
    </>
  );
};

export default NavBarRight;
