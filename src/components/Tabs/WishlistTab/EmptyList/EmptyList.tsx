import { Link } from 'react-router-dom';
import classes from './EmptyList.module.scss';

const EmptyList = () => {
  return (
    <div className={classes.emptyWishlist}>
      <h2>Nothing added to the wishlist yet.</h2>
      <div className={classes.emptyWishlist__link}>
        <Link to="/games">Check some games!</Link>
      </div>
    </div>
  );
};

export default EmptyList;
