import DivLoader from '../../../UI/SkeletonDivLoader/DivLoader';
import classes from './GameDetailLoader.module.scss';

const GameDetailLoader = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingContainer__ctx}>
        <div className={classes[`loadingContainer__ctx--loadingBox`]}>
          <DivLoader />
        </div>
        <div className={classes[`loadingContainer__ctx--loadingBox`]}>
          <DivLoader />
        </div>
        <div className={classes[`loadingContainer__ctx--loadingBox`]}>
          <DivLoader />
        </div>
      </div>
    </div>
  );
};

export default GameDetailLoader;
