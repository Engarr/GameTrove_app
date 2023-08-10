import { Link, useLocation } from 'react-router-dom';
import classes from './FilterList.module.scss';

interface PropsType {
  data: {
    id: number;
    name: string;
  }[];
  activeHandler: () => void;
  pageHandler: (number: number) => void;
  activeCategory?: null | string;
  activePlatform?: null | string;
  title: string;
}

const FilterList = ({
  data,
  activeCategory,
  activePlatform,
  pageHandler,
  activeHandler,
  title,
}: PropsType) => {
  const location = useLocation();
  const activeItem = title === 'category' ? activeCategory : activePlatform;

  return (
    <>
      <h3>Search games by {title}:</h3>
      <div className={classes.filterListContainer}>
        {data.map((item) => {
          const searchParams = new URLSearchParams(location.search);
          searchParams.set(`${title}`, item.id.toString());
          searchParams.set('page', '1');

          const updatedSearch = `?${searchParams.toString()}`;

          return (
            <div
              key={item.id}
              className={
                activeItem === item.id.toString() ? classes.activeButton : ''
              }
            >
              <Link
                to={`/games${updatedSearch}`}
                onClick={() => {
                  activeHandler();
                  pageHandler(1);
                }}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterList;
FilterList.defaultProps = {
  activeCategory: null,
  activePlatform: null,
};
