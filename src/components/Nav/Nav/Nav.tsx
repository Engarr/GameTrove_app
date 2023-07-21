import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoGameControllerOutline } from 'react-icons/io5';
import Search from '../../Search/Search';
import NavBarLeft from '../NavBarLeft/NavBarLeft';
import NavBarRight from '../NavBarRight/NavBarRight';
import classes from './Nav.module.scss';

const Nav = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  const [isActiveRightBar, setIsActiveRightBar] = useState(false);
  const [arrowIsVisible, setArrowIsVisible] = useState(false);

  const scrollPositionHandler = () => {
    const position = window.pageYOffset;
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

  return (
    <div>
      <div className={classes.navBarBox}>
        <div className={classes.navBarBox__logo}>
          <Link
            to="/"
            onClick={() => {
              setIsActiveLeftBar(false);
              setIsActiveRightBar(false);
            }}
          >
            <p>GameTrove</p>
            <IoGameControllerOutline
              className={classes[`navBarBox__logo--icon`]}
            />
          </Link>
        </div>
        <Search
          setIsActiveRightBar={setIsActiveRightBar}
          setIsActiveLeftBar={setIsActiveLeftBar}
        />
      </div>
      <NavBarLeft
        isActiveRightBar={isActiveRightBar}
        setIsActiveRightBar={setIsActiveRightBar}
        isActiveLeftBar={isActiveLeftBar}
        setIsActiveLeftBar={setIsActiveLeftBar}
      />
      <NavBarRight
        isActiveRightBar={isActiveRightBar}
        setIsActiveRightBar={setIsActiveRightBar}
        isActiveLeftBar={isActiveLeftBar}
        setIsActiveLeftBar={setIsActiveLeftBar}
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
    </div>
  );
};

export default Nav;
