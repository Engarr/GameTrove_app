import { Link } from 'react-router-dom';
import classes from './EmptyList.module.scss';

interface PropsType {
  message: string;
  messageTwo?: string;
}

const EmptyList = ({ message, messageTwo }: PropsType) => {
  return (
    <div className={classes.emptyWishlist}>
      <h3>{message}</h3>
      {!messageTwo ? (
        <div className={classes.emptyWishlist__link}>
          <Link to="/games">Check some games!</Link>
        </div>
      ) : (
        <div className={classes.emptyWishlist__link}>
          <p>{messageTwo}</p>
        </div>
      )}
    </div>
  );
};

export default EmptyList;

EmptyList.defaultProps = {
  messageTwo: null,
};
