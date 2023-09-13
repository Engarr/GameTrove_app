import { useState, useEffect } from 'react';
import { TbLayoutNavbarExpand } from 'react-icons/tb';
import { comingGamePlatforms } from '../../../util/db';
import classes from './ToolBar.module.scss';

interface PropsType {
  activeSearch: number;
  activeSearchHandler: (name: number) => void;
}

const ToolBar = ({ activeSearch, activeSearchHandler }: PropsType) => {
  const [isActive, setisActive] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const activeBarHandler = () => {
    setisActive((prev) => !prev);
  };
  const platformName = comingGamePlatforms.find(
    ({ id }) => id === activeSearch
  );
  useEffect(() => {
    setFadeIn(true);

    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeSearch]);
  return (
    <div className={classes.container}>
      <h2>
        Upcoming games for the platform:
        <span className={fadeIn ? classes.fadeIn : ''}>
          {platformName?.name}
        </span>
      </h2>
      <p>
        <span>**</span>According to the most expected
      </p>
      <TbLayoutNavbarExpand
        className={`${classes.expand} ${isActive ? classes.arrowDown : ''}`}
        onClick={activeBarHandler}
      />
      <div
        className={`${classes.tollbarBox} ${isActive ? classes.activeBar : ''}`}
      >
        {comingGamePlatforms.map((platform) => (
          <button
            className={activeSearch === platform.id ? classes.active : ''}
            type="button"
            key={platform.id}
            onClick={() => {
              activeSearchHandler(platform.id);
              activeBarHandler();
            }}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
