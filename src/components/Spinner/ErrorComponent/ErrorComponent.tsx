import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import classes from './ErrorComponent.module.scss';

interface PropsType {
  message: string | undefined;
}

const ErrorComponent = ({ message }: PropsType) => {
  return (
    <div className={classes.errorComponent}>
      <BsFillExclamationOctagonFill className={classes.errorComponent__icon} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorComponent;
