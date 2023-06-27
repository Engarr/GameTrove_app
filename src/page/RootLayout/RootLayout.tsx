import { useState } from 'react';

import { Outlet, Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import classes from './RootLayout.module.scss';
import NavBarLeft from '../../components/Nav/NavBarLeft/NavBarLeft';
import NavBarRight from '../../components/Nav/NavBarRight/NavBarRight';

const RootLayout = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(true);
  const [isActiveRightBar, setIsActiveRightBar] = useState(true);

  return (
    <div className="dark">
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
        setIsActiveLeftBar={setIsActiveLeftBar}
        isActiveLeftBar={isActiveLeftBar}
      />
      <NavBarRight
        isActiveRightBar={isActiveRightBar}
        setIsActiveRightBar={setIsActiveRightBar}
      />

      <Outlet />
    </div>
  );
};

export default RootLayout;
