import {
  useGetNotReleasedQuery,
  useGetGamesQuery,
} from '../../store/api/feedSlice';
import classes from './HomePage.module.scss';

const HomePage = () => {
  const { data } = useGetNotReleasedQuery();
  // console.log(data);
  return <section className={classes.wrapper}>Home</section>;
};

export default HomePage;
