import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

interface PropsType {
  show: boolean;
  handler?: () => void;
}

const Modal = ({ show, handler }: PropsType) => {
  if (!show) return null;

  const backdropElement = document.getElementById('backdrop');

  if (!backdropElement) return null;

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={classes.backdrop} onClick={handler} />,
    backdropElement
  );
};

export default Modal;
