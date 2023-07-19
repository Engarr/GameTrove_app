import { IoIosArrowUp } from 'react-icons/io';
import { PiUserPlusFill, PiUserFill } from 'react-icons/pi';
import classes from './NavBarRight.module.scss';
import Modal from '../../Modal/Modal';
import ThemeMode from '../../ThemeMode/ThemeMode';

interface PropsType {
  isActiveLeftBar: boolean;
  isActiveRightBar: boolean;
  setIsActiveRightBar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActiveLeftBar: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBarRight = ({
  isActiveRightBar,
  setIsActiveRightBar,
  isActiveLeftBar,
  setIsActiveLeftBar,
}: PropsType) => {
  const activeHandler = () => {
    setIsActiveRightBar((prev) => !prev);
    if (isActiveLeftBar) {
      setIsActiveLeftBar(false);
    }
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
            <ThemeMode />
          </div>
          <div
            className={classes.arrowBox}
            onClick={activeHandler}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Space') {
                activeHandler();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <IoIosArrowUp
              className={`${classes.arrowBox__icon} ${
                isActiveRightBar ? classes.arrowRotate : ''
              }`}
            />
          </div>
        </div>
      </div>
      <Modal show={isActiveRightBar} handler={activeHandler} />
    </>
  );
};

export default NavBarRight;
