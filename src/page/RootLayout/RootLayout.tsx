import { useState } from 'react';

import { Outlet, Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import classes from './RootLayout.module.scss';
import NavBarLeft from '../../components/Nav/NavBarLeft/NavBarLeft';
import NavBarRight from '../../components/Nav/NavBarRight/NavBarRight';

const RootLayout = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  const [isActiveRightBar, setIsActiveRightBar] = useState(false);

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
    </div>
  );
};

export default RootLayout;
