import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import Search from '../../Search/Search';
import NavBarLeft from '../NavBarLeft/NavBarLeft';
import NavBarRight from '../NavBarRight/NavBarRight';
import classes from './Nav.module.scss';

const Nav = () => {
  const [isActiveLeftBar, setIsActiveLeftBar] = useState(false);
  const [isActiveRightBar, setIsActiveRightBar] = useState(false);
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
    </div>
  );
};

export default Nav;
