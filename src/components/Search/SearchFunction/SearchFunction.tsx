import { Link } from 'react-router-dom';
import { useGetSearchgameQuery } from '../../../store/api/feedSlice';
import classes from '../Search.module.scss';

interface DataType {
  data: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
  }[];
  isLoading: boolean;
  isError: boolean;
}
interface PropsType {
  isHideHandler: () => void;
  searchInput: string;
}
const SearchFunction = ({ isHideHandler, searchInput }: PropsType) => {
  const { data, isLoading, isError } = useGetSearchgameQuery<DataType>(
    searchInput,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  let searchContent;
  if (isLoading) {
    searchContent = (
      <div className={classes.searchLoading}>
        <p>Searching...</p>
      </div>
    );
  } else if (isError) {
    searchContent = (
      <div className={classes.searchError}>
        <p>Something went wrong, please try again later.</p>
      </div>
    );
  } else if (!isLoading && data && data.length === 0) {
    searchContent = (
      <div>
        <p>No results</p>
      </div>
    );
  } else if (data && data.length !== 0) {
    searchContent = (
      <ul>
        {data.map((game) => {
          let imageUrl;
          if (game.cover && game.cover.url) {
            imageUrl = game.cover.url.replace('t_thumb', 't_720p');
          }
          return (
            <li key={game.id}>
              {imageUrl && <img src={imageUrl} alt={game.name} width={50} />}
              <Link to={`/game/${game.id}`} onClick={isHideHandler}>
                {game.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return <div className={classes.search__results}>{searchContent}</div>;
};

export default SearchFunction;
