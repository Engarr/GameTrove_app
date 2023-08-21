import classes from './Loade.module.scss';
import DivLoader from '../../../UI/SkeletonDivLoader/DivLoader';

const Loader = () => {
  const emptyCards = 5;
  return (
    <>
      {Array.from({ length: emptyCards }, (_, index) => (
        <div className={classes.emptyCard} key={index}>
          <DivLoader />
        </div>
      ))}
    </>
  );
};

export default Loader;
