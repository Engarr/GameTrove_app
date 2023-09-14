import { useCallback } from 'react';
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
  isFetching: boolean;
}
interface PropsType {
  isHideHandler: () => void;
  searchInput: string;
}
const SearchFunction = ({ isHideHandler, searchInput }: PropsType) => {
  const { data, isLoading, isError, isFetching } =
    useGetSearchgameQuery<DataType>(searchInput, {
      refetchOnMountOrArgChange: true,
    });

  const handleClickLink = useCallback(() => {
    isHideHandler();
  }, [isHideHandler]);

  let searchContent;
  if (isLoading || isFetching) {
    searchContent = (
      <div className={classes.searchLoading}>
        <p>
          Searching
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
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
      <div className={classes.noResults}>
        <p>There is no such game</p>
      </div>
    );
  } else if (data && data.length !== 0) {
    searchContent = (
      <ul>
        {data.map((game) => {
          let imageUrl =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&usqp=CAU';
          if (game.cover && game.cover.url) {
            imageUrl = game.cover.url
              .replace('t_thumb', 't_cover_small')
              .replace('.jpg', '.webp');
          }
          return (
            <li key={game.id}>
              {imageUrl && (
                <Link to={`/game/${game.id}`} onClick={handleClickLink}>
                  <img src={imageUrl} alt={game.name} width={100} />
                </Link>
              )}
              <Link to={`/game/${game.id}`} onClick={handleClickLink}>
                <p>{game.name}</p>
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
