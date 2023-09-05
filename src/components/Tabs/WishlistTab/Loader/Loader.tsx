import classes from './Loade.module.scss';
import DivLoader from '../../../UI/SkeletonDivLoader/DivLoader';

const Loader = () => {
  const emptyCards = 4;
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingContainer__cardsBox}>
        {Array.from({ length: emptyCards }, (_, index) => (
          <div className={classes.loadingCard} key={index}>
            <DivLoader />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
