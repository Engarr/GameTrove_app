import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { gamePlatforms } from '../../../util/db';
import classes from './ToolBar.module.scss';

interface PropsType {
  setActiveSearch: React.Dispatch<React.SetStateAction<string>>;
  activeSearch: string;
}

const ToolBar = ({ setActiveSearch, activeSearch }: PropsType) => {
  const activeSearchHandler = (name: string) => {
    setActiveSearch(name);
  };
  const [isActive, setisActive] = useState(true);

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
        {gamePlatforms.map((platform) => (
          <button
            className={activeSearch === platform.name ? classes.active : ''}
            type="button"
            key={platform.id}
            onClick={() => {
              activeSearchHandler(platform.name);
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
