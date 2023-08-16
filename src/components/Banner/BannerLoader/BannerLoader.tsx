import classes from './BannerLoader.module.scss';
import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';
import bgc from '../../../asset/bgc.png';
import bgcLight from '../../../asset/bgc-light.png';

interface PropsType {
  mode: string;
}

const BannerLoader = ({ mode }: PropsType) => {
  return (
    <div className={classes.loadingBox}>
      <div className={classes.loadingBox__card}>
        <DivLoader />
      </div>
      <div className={classes.loadingBox__textBox}>
        <DivLoader />
      </div>
      <img
        src={mode === 'dark' ? bgc : bgcLight}
        alt=""
        height={20}
        className={classes.loadingBox__img}
      />
    </div>
  );
};

export default BannerLoader;
