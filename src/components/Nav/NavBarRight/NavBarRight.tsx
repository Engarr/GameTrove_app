import { IoIosArrowUp } from 'react-icons/io';
import { PiUserPlusFill, PiUserFill } from 'react-icons/pi';
import { AiOutlineLogout } from 'react-icons/ai';
import { Form, Link, useRouteLoaderData } from 'react-router-dom';
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
  const token = useRouteLoaderData('root');

  const activeHandler = () => {
    setIsActiveRightBar((prev) => !prev);
    if (isActiveLeftBar) {
      setIsActiveLeftBar(false);
    }
  };
  let content;
  if (!token) {
    content = (
      <>
        <div>
          <Link to="/account?mode=login" onClick={activeHandler}>
            Login
            <PiUserFill className={classes[`nav__buttons--icon`]} />
          </Link>
        </div>
        <div>
          <Link to="/account?mode=register" onClick={activeHandler}>
            Join us
            <PiUserPlusFill className={classes[`nav__buttons--icon`]} />
          </Link>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div>
          <Link to="/account" onClick={activeHandler}>
            My account
            <PiUserFill className={classes[`nav__buttons--icon`]} />
          </Link>
        </div>
        <div>
          <Form action="/logout" method="post">
            <button
              className={classes.logoutButton}
              type="submit"
              onClick={activeHandler}
            >
              Wyloguj się
              <AiOutlineLogout className={classes[`nav__buttons--icon`]} />
            </button>
          </Form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={classes.nav}>
        <div
          className={`${classes.nav__container} ${
            isActiveRightBar ? classes.active : ''
          }`}
        >
          <div className={classes.nav__buttons}>
            {content}
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
