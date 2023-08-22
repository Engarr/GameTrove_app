import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoGameControllerOutline } from 'react-icons/io5';
import Toast from '../../Toast/Toast';
import Search from '../../Search/Search';
import NavBarLeft from '../NavBarLeft/NavBarLeft';
import NavBarRight from '../NavBarRight/NavBarRight';
import classes from './Nav.module.scss';
import {
  activeLeftBar,
  activeRightBar,
  toggleActiveLeftNavBar,
  toggleActiveRightNavBar,
} from '../../../store/slice/UiSLice';

const Nav = () => {
  // const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  // const [isActiveRightBar, setIsActiveRightBar] = useState(false);
  const dispacth = useDispatch();
  const isLeftNavActive = useSelector(activeLeftBar);
  const isRightNavActive = useSelector(activeRightBar);

  const [arrowIsVisible, setArrowIsVisible] = useState(false);

  const scrollPositionHandler = () => {
    const position = window.scrollY;
    if (position > 400) {
      setArrowIsVisible(true);
    } else {
      setArrowIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollPositionHandler);

    return () => {
      window.removeEventListener('scroll', scrollPositionHandler);
    };
  }, []);
  const arrowVisibleClass = arrowIsVisible
    ? classes.isVisible
    : classes.isNotVisible;

  const activeLeftNavBarHandler = (action: boolean | undefined) => {
    if (action === false) {
      dispacth(toggleActiveLeftNavBar(action));
    } else {
      dispacth(toggleActiveLeftNavBar());
    }
  };

  const activeRightNavBarHandler = (action: boolean | undefined) => {
    if (action === false) {
      dispacth(toggleActiveRightNavBar(action));
    } else {
      dispacth(toggleActiveRightNavBar());
    }
  };

  return (
    <div>
      <div className={classes.navBarBox}>
        <div className={classes.navBarBox__logo}>
          <Link
            to="/"
            onClick={() => {
              activeLeftNavBarHandler(false);
              activeRightNavBarHandler(false);
            }}
          >
            <p>GameTrove</p>
            <IoGameControllerOutline
              className={classes[`navBarBox__logo--icon`]}
            />
          </Link>
        </div>
        <Search
          setIsActiveRightBar={() => {
            activeRightNavBarHandler(false);
          }}
          setIsActiveLeftBar={() => {
            activeLeftNavBarHandler(false);
          }}
        />
      </div>
      <NavBarLeft
        activeRightNavBarHandler={activeRightNavBarHandler}
        activeLeftNavBarHandler={activeLeftNavBarHandler}
        isLeftNavActive={isLeftNavActive}
        isRightNavActive={isRightNavActive}
      />
      <NavBarRight
        activeRightNavBarHandler={activeRightNavBarHandler}
        activeLeftNavBarHandler={activeLeftNavBarHandler}
        isLeftNavActive={isLeftNavActive}
        isRightNavActive={isRightNavActive}
      />
      <button
        type="button"
        className={`${classes.arrowUp} ${arrowVisibleClass}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <MdKeyboardArrowUp />
      </button>
      <Toast />
    </div>
  );
};

export default Nav;
