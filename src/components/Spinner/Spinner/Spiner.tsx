import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import classes from './Spiner.module.scss';
import { colorMode } from '../../../store/slice/ThemeSlice';
import Loader from '../Loader/Loader';

interface PropsType {
  // eslint-disable-next-line react/require-default-props
  message?: string;
}
const Spiner = ({ message }: PropsType) => {
  const mode = useSelector(colorMode);
  const color = mode === 'dark' ? 'rgb(173, 255, 47,0.2)' : 'rgb(68, 73, 80)';

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
        secondaryColor={color}
        strokeWidth={5}
        strokeWidthSecondary={3}
      />
      {message && (
        <div className={classes.spiner__text}>
          <Loader message={message} color="var(--greenYellow)" />
        </div>
      )}
    </div>
  );
};

export default Spiner;
