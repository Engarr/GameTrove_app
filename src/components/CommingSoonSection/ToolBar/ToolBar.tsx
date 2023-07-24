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
  return (
    <div className={classes.tollbarBox}>
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
  );
};

export default ToolBar;
