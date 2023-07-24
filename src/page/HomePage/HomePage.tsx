import Banner from '../../components/Banner/Banner';
import CategoryGameCard from '../../components/CategoryGameCard/CategoryGameCard';
import CommingSoon from '../../components/CommingSoonSection/CommingSoon';
import classes from './HomePage.module.scss';

const HomePage = () => {
  return (
    <section className={classes.homeWrapper}>
      <Banner />
      <CategoryGameCard />
      <CommingSoon />
    </section>
  );
};

export default HomePage;
