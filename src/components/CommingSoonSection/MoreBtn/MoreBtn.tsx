import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import classes from './MoreBtn.module.scss';

const MoreBtn = () => {
  return (
    <button type="button" className={classes.moreBtn}>
      <Link to="/comingGames">See more</Link>
      <MdArrowForwardIos
        className={`${classes.moreBtn__icon} ${classes['moreBtn__icon--one']}`}
      />
      <MdArrowForwardIos
        className={`${classes.moreBtn__icon} ${classes['moreBtn__icon--two']}`}
      />
      <MdArrowForwardIos
        className={`${classes.moreBtn__icon} ${classes['moreBtn__icon--three']}`}
      />
    </button>
  );
};

export default MoreBtn;
