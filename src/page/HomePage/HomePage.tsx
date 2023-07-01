import Banner from '../../components/Banner/Banner';
import CategoryGameCard from '../../components/CategoryGameCard.module.scss/CategoryGameCard';
import classes from './HomePage.module.scss';

const HomePage = () => {
  return (
    <section className={classes.wrapper}>
      <Banner />

      <CategoryGameCard />
    </section>
  );
};

export default HomePage;
