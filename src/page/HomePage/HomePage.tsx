import Banner from '../../components/Banner/Banner';
import CategoryGameCard from '../../components/CategoryGameCard/CategoryGameCard';
import classes from './HomePage.module.scss';

const HomePage = () => {
  return (
    <section className={classes.homeWrapper}>
      <Banner />
      <CategoryGameCard />
    </section>
  );
};

export default HomePage;
