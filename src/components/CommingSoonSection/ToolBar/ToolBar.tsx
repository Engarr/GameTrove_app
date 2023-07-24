import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { comingGamePlatforms } from '../../../util/db';
import classes from './ToolBar.module.scss';

interface PropsType {
  setActiveSearch: React.Dispatch<React.SetStateAction<number>>;
  activeSearch: number;
}

const ToolBar = ({ setActiveSearch, activeSearch }: PropsType) => {
  const activeSearchHandler = (name: number) => {
    setActiveSearch(name);
  };
  const [isActive, setisActive] = useState(false);

  const activeBarHandler = () => {
    setisActive((prev) => !prev);
  };
  return (
    <>
      <MdExpandMore
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
    </>
  );
};

export default ToolBar;
