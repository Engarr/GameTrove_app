import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import classes from './Search.module.scss';
import Modal from '../Modal/Modal';
import { useGetSearchgameQuery } from '../../store/api/feedSlice';
import SearchFunction from './SearchFunction/SearchFunction';

const Search = () => {
  const [isHide, setIsHide] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const isHideHandler = () => {
    setIsHide((prev) => !prev);
    setSearchInput('');
  };

  return (
    <>
      <div className={classes.search}>
        <BsSearch className={classes.search__icon} onClick={isHideHandler} />
        <div
          className={`${classes.search__inputBox} ${
            isHide ? classes.hide : classes.show
          }`}
        >
          <input
            placeholder="Search.."
            value={searchInput}
            onChange={inputHandler}
          />
          {!isHide && searchInput !== '' && (
            <SearchFunction
              isHideHandler={isHideHandler}
              searchInput={searchInput}
            />
          )}
        </div>
      </div>
      <Modal show={!isHide} handler={isHideHandler} />
    </>
  );
};

export default Search;
