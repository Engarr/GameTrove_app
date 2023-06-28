import { Oval } from 'react-loader-spinner';
import classes from './Spinder.module.scss';

interface PropsType {
  // eslint-disable-next-line react/require-default-props
  message?: string;
}
const Spiner = ({ message }: PropsType) => {
  return (
    <div className={classes.spiner}>
      <Oval
        height={80}
        width={80}
        color="rgb(173, 255, 47)"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="rgb(173, 255, 47,0.2)"
        strokeWidth={5}
        strokeWidthSecondary={3}
      />
      {message && <p className={classes.text}>{message}</p>}
    </div>
  );
};

export default Spiner;
