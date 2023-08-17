import classes from './GameDetailBannerLoader.module.scss';
import DivLoader from '../../../Spinner/SkeletonDivLoader/DivLoader';

const GameDetailBannerLoader = () => {
  return (
    <div className={classes.loadingBox}>
      <div className={classes.loadingBox__card}>
        <DivLoader />
      </div>
      <div className={classes.loadingBox__textBox}>
        <DivLoader />
      </div>
    </div>
  );
};

export default GameDetailBannerLoader;
