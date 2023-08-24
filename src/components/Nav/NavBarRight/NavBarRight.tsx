import { useCallback } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './NavBarRight.module.scss';
import Modal from '../../Modal/Modal';
import ThemeMode from '../../ThemeMode/ThemeMode';
import UnregisteredCtx from './UnregisteredCtx/UnregisteredCtx';
import LogedIn from './LogedIn/LogedIn';

interface PropsType {
  isRightNavActive: boolean;
  isLeftNavActive: boolean;
  activeRightNavBarHandler: (action: boolean | undefined) => void;
  activeLeftNavBarHandler: (action: boolean | undefined) => void;
}
const NavBarRight = ({
  isRightNavActive,
  isLeftNavActive,
  activeRightNavBarHandler,
  activeLeftNavBarHandler,
}: PropsType) => {
  const token = useRouteLoaderData('root');

  const activeHandler = useCallback(() => {
    activeRightNavBarHandler(undefined);

    if (isLeftNavActive) {
      activeLeftNavBarHandler(false);
    }
  }, [isLeftNavActive, activeLeftNavBarHandler, activeRightNavBarHandler]);

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
            isRightNavActive ? classes.active : ''
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
                isRightNavActive ? classes.arrowRotate : ''
              }`}
            />
          </div>
        </div>
      </div>
      <Modal
        show={isRightNavActive}
        handler={activeHandler}
        zIndexNumber="99"
      />
    </>
  );
};

export default NavBarRight;
