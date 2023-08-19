import { Link } from 'react-router-dom';
import { PiUserPlusFill, PiUserFill } from 'react-icons/pi';
import classes from '../NavBarRight.module.scss';

interface PropsType {
  activeHandler: () => void;
}

const UnregisteredCtx = ({ activeHandler }: PropsType) => {
  return (
    <>
      <div>
        <Link to="/account?mode=login" onClick={activeHandler}>
          Login
          <PiUserFill className={classes[`nav__buttons--icon`]} />
        </Link>
      </div>
      <div>
        <Link to="/account?mode=register" onClick={activeHandler}>
          Join us
          <PiUserPlusFill className={classes[`nav__buttons--icon`]} />
        </Link>
      </div>
    </>
  );
};

export default UnregisteredCtx;
