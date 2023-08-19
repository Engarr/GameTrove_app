import { IoIosArrowUp } from 'react-icons/io';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './NavBarRight.module.scss';
import Modal from '../../Modal/Modal';
import ThemeMode from '../../ThemeMode/ThemeMode';
import UnregisteredCtx from './UnregisteredCtx/UnregisteredCtx';
import LogedIn from './LogedIn/LogedIn';

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
    content = <UnregisteredCtx activeHandler={activeHandler} />;
  } else {
    content = <LogedIn activeHandler={activeHandler} />;
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
