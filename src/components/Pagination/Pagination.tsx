import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdLastPage, MdFirstPage } from 'react-icons/md';
import classes from './Pagination.module.scss';

interface PropsType {
  totalPages: number;
}

const Pagination = ({ totalPages }: PropsType) => {
  const pages = Math.ceil(totalPages / 10);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get('page'));

  const [activePage, setActivePage] = useState(page || 1);

  const nextPageHanlder = () => {
    if (activePage < pages) {
      setActivePage((prev) => prev + 1);
    }
  };

  const prevPageHandler = () => {
    if (activePage > 1) {
      setActivePage((prev) => prev - 1);
    }
  };
  const pageHandler = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  const updatePageInLink = (newPage: number) => {
    const updatedSearchParams = new URLSearchParams(location.search);
    updatedSearchParams.set('page', newPage.toString());

    return `?${updatedSearchParams.toString()}`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        {activePage !== 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                pageHandler(1);
              }}
            >
              <Link to={`/games${updatePageInLink(1)}`}>
                <MdFirstPage />1
              </Link>
            </button>
            <button type="button" onClick={prevPageHandler}>
              <Link to={`/games${updatePageInLink(activePage - 1)}`}>Prev</Link>
            </button>
          </>
        )}

        <p>{activePage}</p>
        {activePage < pages && (
          <button type="button" onClick={nextPageHanlder}>
            <Link to={`/games${updatePageInLink(activePage + 1)}`}>
              {activePage + 1}
            </Link>
          </button>
        )}

        {activePage !== pages && (
          <>
            <button type="button" onClick={nextPageHanlder}>
              <Link to={`/games${updatePageInLink(activePage + 1)}`}>Next</Link>
            </button>
            <button
              type="button"
              onClick={() => {
                pageHandler(pages);
              }}
            >
              <Link to={`/games${updatePageInLink(pages)}`}>
                <MdLastPage />
                {pages}
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
