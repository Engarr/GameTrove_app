import Tabs from '../../components/Tabs/Tabs';
import classes from './UserPage.module.scss';

const UserPage = () => {
  return (
    <div className={classes.conatiner}>
      <div className={classes.image} />
      <div className={classes.shadow} />
      <Tabs />
    </div>
  );
};

export default UserPage;
