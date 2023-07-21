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
  const updatePageInLink = (newPage: number) => {
    const updatedSearchParams = new URLSearchParams(location.search);
    updatedSearchParams.set('page', newPage.toString());

    return `?${updatedSearchParams.toString()}`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
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
        <div className={classes.pagination__activePage}>
          <p>{activePage}</p>
        </div>

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
  );
};

export default Pagination;
