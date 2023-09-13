import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import classes from './ErrorComponent.module.scss';

interface PropsType {
  message: string | undefined;
  messageTwo?: string;
}

const ErrorComponent = ({ message, messageTwo }: PropsType) => {
  return (
    <div className={classes.errorComponent}>
      <BsFillExclamationOctagonFill className={classes.errorComponent__icon} />
      {message && (
        <p className={classes.errorComponent__biggerText}>{message}</p>
      )}
      {messageTwo && (
        <p className={classes.errorComponent__lowerText}>{messageTwo}</p>
      )}
    </div>
  );
};

export default ErrorComponent;

ErrorComponent.defaultProps = {
  messageTwo: null,
};
