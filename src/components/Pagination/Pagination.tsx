import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdLastPage,
  MdFirstPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';
import classes from './Pagination.module.scss';
import {
  changePageUp,
  changePageDown,
  actualPage,
  switchPage,
} from '../../store/slice/PaginationSlice';

interface PropsType {
  totalPages: number;
}

const Pagination = ({ totalPages }: PropsType) => {
  const pages = Math.ceil(totalPages / 10);
  const dispatch = useDispatch();
  const activePage = useSelector(actualPage);
  const location = useLocation();
  const [gotToPage, setGotToPage] = useState<number | null>(null);

  const nextPageHanlder = () => {
    if (activePage < pages) {
      dispatch(changePageUp());
    }
  };

  const prevPageHandler = () => {
    if (activePage > 1) {
      dispatch(changePageDown());
    }
  };
  const pageHandler = (pageNumber: number) => {
    dispatch(switchPage(pageNumber));
  };
  useEffect(() => {
    setGotToPage(0);
  }, [activePage]);
  const updatePageInLink = (newPage: number) => {
    const updatedSearchParams = new URLSearchParams(location.search);
    updatedSearchParams.set('page', newPage.toString());

    return `?${updatedSearchParams.toString()}`;
  };
  const gotToPageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = Number(e.target.value);
    setGotToPage(pageNumber);
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <div>
          <button
            type="button"
            onClick={() => {
              pageHandler(1);
            }}
            disabled={activePage === 1}
            className={`${activePage === 1 ? classes.disabled : ''}`}
          >
            <Link to={`/games${updatePageInLink(1)}`}>
              <MdFirstPage className={classes.pagination__icon} />1
            </Link>
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={prevPageHandler}
            disabled={activePage === 1}
            className={`${activePage === 1 ? classes.disabled : ''}`}
          >
            <Link to={`/games${updatePageInLink(activePage - 1)}`}>
              <MdNavigateBefore className={classes.pagination__prev} />
            </Link>
          </button>
        </div>
        <div className={classes.pagination__activePage}>
          <p>{activePage}</p>
        </div>

        <div>
          <button
            type="button"
            onClick={nextPageHanlder}
            disabled={activePage >= pages}
            className={`${activePage >= pages ? classes.disabled : ''}`}
          >
            <Link to={`/games${updatePageInLink(activePage + 1)}`}>
              {activePage + 1}
            </Link>
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={nextPageHanlder}
            disabled={activePage === pages}
            className={`${activePage === pages ? classes.disabled : ''}`}
          >
            <Link to={`/games${updatePageInLink(activePage + 1)}`}>
              <MdNavigateNext className={classes.pagination__next} />
            </Link>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              pageHandler(pages);
            }}
            disabled={activePage === pages}
            className={`${activePage === pages ? classes.disabled : ''}`}
          >
            <Link to={`/games${updatePageInLink(pages)}`}>
              {pages}
              <MdLastPage className={classes.pagination__icon} />
            </Link>
          </button>
        </div>
      </div>
      <div className={classes.pagination__inputContainer}>
        <input
          type="number"
          onChange={gotToPageHandler}
          value={gotToPage && gotToPage > 0 ? gotToPage : ''}
        />
        {gotToPage !== null && gotToPage > 0 ? (
          <Link
            to={`/games${updatePageInLink(gotToPage)}`}
            onClick={() => {
              pageHandler(gotToPage);
            }}
          >
            Go
          </Link>
        ) : (
          <p>Go</p>
        )}
      </div>
    </div>
  );
};

export default Pagination;
