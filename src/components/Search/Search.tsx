import { useState, useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.scss';
import SearchFunction from './SearchFunction/SearchFunction';
import Modal from '../Modal/Modal';

interface PropsType {
  activeSearchHandler: (action: boolean | undefined) => void;
  setIsActiveLeftBar: (action: boolean | undefined) => void;
  setIsActiveRightBar: (action: boolean | undefined) => void;
  isSearchBarActive: boolean;
}
const Search = ({
  setIsActiveRightBar,
  setIsActiveLeftBar,
  activeSearchHandler,
  isSearchBarActive,
}: PropsType) => {
  const [searchInput, setSearchInput] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const isHideHandler = useCallback(() => {
    activeSearchHandler(undefined);
    setSearchInput('');
    if (isSearchBarActive) {
      activeSearchHandler(false);
    }
  }, [activeSearchHandler, isSearchBarActive]);

  return (
    <>
      <div className={classes.search}>
        <BsSearch
          className={classes.search__icon}
          onClick={() => {
            isHideHandler();
            setIsActiveRightBar(false);
            setIsActiveLeftBar(false);
          }}
        />

        <div
          className={`${classes.search__inputBox} ${
            !isSearchBarActive ? classes.hide : classes.show
          }`}
        >
          <input
            placeholder="Search..."
            value={searchInput}
            onChange={inputHandler}
          />
          {!isSearchBarActive && searchInput !== '' && (
            <SearchFunction
              isHideHandler={isHideHandler}
              searchInput={searchInput}
            />
          )}
        </div>
      </div>
      <Modal
        show={isSearchBarActive}
        handler={isHideHandler}
        zIndexNumber="99"
      />
    </>
  );
};

export default Search;
