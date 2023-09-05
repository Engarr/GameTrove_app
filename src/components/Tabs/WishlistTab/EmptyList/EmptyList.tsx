import { Link } from 'react-router-dom';
import classes from './EmptyList.module.scss';

const EmptyList = () => {
  return (
    <div className={classes.emptyWishlist}>
      <h3>Nothing added yet</h3>
      <div className={classes.emptyWishlist__link}>
        <Link to="/games">Check some games!</Link>
      </div>
    </div>
  );
};

export default EmptyList;
