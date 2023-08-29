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
  activeSearchBar,
  toggleActiveLeftNavBar,
  toggleActiveRightNavBar,
  toggleActiveSearchBar,
} from '../../../store/slice/UiSLice';

const Nav = () => {
  const dispacth = useDispatch();
  const isLeftNavActive = useSelector(activeLeftBar);
  const isRightNavActive = useSelector(activeRightBar);
  const isSearchBarActive = useSelector(activeSearchBar);

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
  const activeSearchHandler = (action: boolean | undefined) => {
    if (action === false) {
      dispacth(toggleActiveSearchBar(action));
    } else {
      dispacth(toggleActiveSearchBar());
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
              activeSearchHandler(false);
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
          activeSearchHandler={activeSearchHandler}
          isSearchBarActive={isSearchBarActive}
        />
      </div>
      <NavBarLeft
        activeRightNavBarHandler={activeRightNavBarHandler}
        activeLeftNavBarHandler={activeLeftNavBarHandler}
        activeSearchHandler={activeSearchHandler}
        isLeftNavActive={isLeftNavActive}
        isRightNavActive={isRightNavActive}
        isSearchBarActive={isSearchBarActive}
      />
      <NavBarRight
        activeRightNavBarHandler={activeRightNavBarHandler}
        activeLeftNavBarHandler={activeLeftNavBarHandler}
        activeSearchHandler={activeSearchHandler}
        isLeftNavActive={isLeftNavActive}
        isRightNavActive={isRightNavActive}
        isSearchBarActive={isSearchBarActive}
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
