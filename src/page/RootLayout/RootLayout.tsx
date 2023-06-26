import { Outlet, Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';
import classes from './RootLayout.module.scss';
import NavBarLeft from '../../components/Nav/NavBarLeft/NavBarLeft';
import NavBarRight from '../../components/Nav/NavBarRight/NavBarRight';

const RootLayout = () => {
  return (
    <div className="dark">
      <div className={classes.logo}>
        <Link to="/">
          <p>GameTrove</p>
          <IoGameControllerOutline className={classes.logo__icon} />
        </Link>
      </div>
      <NavBarLeft />
      <NavBarRight />

      <Outlet />
    </div>
  );
};

export default RootLayout;
