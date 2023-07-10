import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import classes from './RootLayout.module.scss';
import NavBarLeft from '../../components/Nav/NavBarLeft/NavBarLeft';
import NavBarRight from '../../components/Nav/NavBarRight/NavBarRight';
import { colorMode } from '../../store/slice/ThemeSlice';

const RootLayout = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  const [isActiveRightBar, setIsActiveRightBar] = useState(false);
  const mode = useSelector(colorMode);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <section
      className={`${mode === 'light' ? 'light' : 'dark'} ${classes.background}`}
    >
      <div className={classes.logo}>
        <Link
          to="/"
          onClick={() => {
            setIsActiveLeftBar(false);
            setIsActiveRightBar(false);
          }}
        >
          <p>GameTrove</p>
          <IoGameControllerOutline className={classes.logo__icon} />
        </Link>
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

      <Outlet />
    </section>
  );
};

export default RootLayout;
