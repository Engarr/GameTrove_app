import DivLoader from '../../Spinner/SkeletonDivLoader/DivLoader';
import classes from './LoadingCard.module.scss';

const LoadingCard = () => {
  const cardNumber = 3;
  return (
    <div className={classes.loadingContainer}>
      {Array.from({ length: cardNumber }, (_, index) => (
        <div key={index} className={classes.loadingContainer__box}>
          <div className={classes.loadingContainer__img}>
            <DivLoader />
          </div>
          <div className={classes.loadingContainer__ctx}>
            <div className={classes[`loadingContainer__ctx--card`]}>
              <DivLoader />
            </div>
            <div className={classes[`loadingContainer__ctx--card`]}>
              <DivLoader />
            </div>
            <div className={classes[`loadingContainer__ctx--card`]}>
              <DivLoader />
            </div>
            <div className={classes[`loadingContainer__ctx--card`]}>
              <DivLoader />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCard;
