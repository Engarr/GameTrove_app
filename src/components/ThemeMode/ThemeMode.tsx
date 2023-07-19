import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import classes from './ThemeMode.module.scss';
import { toggleMode, colorMode } from '../../store/slice/ThemeSlice';

const ThemeMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector(colorMode);

  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };
  useEffect(() => {
    const { body } = document;
    body.classList.add(mode);

    return () => {
      body.classList.remove(mode);
    };
  }, [mode]);
  return (
    <div className={classes.container}>
      <p>Theme:</p>
      <div
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            toggleModeHandler();
          }
        }}
        role="button"
        tabIndex={0}
        onClick={toggleModeHandler}
        className={classes.container__icon}
      >
        {mode === 'dark' ? <MdDarkMode /> : <MdLightMode />}
      </div>
    </div>
  );
};

export default ThemeMode;
