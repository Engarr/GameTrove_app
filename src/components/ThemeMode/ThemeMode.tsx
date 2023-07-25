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
      <div>
        <label className={classes.switch} htmlFor="theme">
          <input type="checkbox" id="theme" onClick={toggleModeHandler} />
          <span className={classes.slider} />
        </label>
      </div>
    </div>
  );
};

export default ThemeMode;
