import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';
import classes from './LoadingContext.module.scss';

const LoadingContext = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingContainer__title}>
        <DivLoader />
      </div>
      <div className={classes.loadingContainer__emptyCard}>
        <DivLoader />d
      </div>
      <div className={classes.loadingContainer__emptyCard}>
        <DivLoader />
      </div>
      <div className={classes.loadingContainer__emptyCard}>
        <DivLoader />
      </div>
    </div>
  );
};

export default LoadingContext;
