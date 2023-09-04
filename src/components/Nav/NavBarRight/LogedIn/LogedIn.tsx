import { PiUserFill } from 'react-icons/pi';
import { AiOutlineLogout } from 'react-icons/ai';
import { Form, Link } from 'react-router-dom';
import classes from '../NavBarRight.module.scss';

interface PropsType {
  activeHandler: () => void;
}

const LogedIn = ({ activeHandler }: PropsType) => {
  return (
    <>
      <div>
        <Link to="/account" onClick={activeHandler}>
          My account
          <PiUserFill className={classes[`nav__buttons--icon`]} />
        </Link>
      </div>
      <div>
        <Form action="/logout" method="post">
          <button
            className={classes.logoutButton}
            type="submit"
            onClick={activeHandler}
          >
            Logout
            <AiOutlineLogout className={classes[`nav__buttons--icon`]} />
          </button>
        </Form>
      </div>
    </>
  );
};

export default LogedIn;
