import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchPage } from '../../../store/slice/PaginationSlice';
import classes from './NavBarLeft.module.scss';
import Modal from '../../Modal/Modal';
import { gameCategories, gamePlatforms } from '../../../util/db';
import FilterList from './CategoryItem/FilterList';

interface PropsType {
  isActiveLeftBar: boolean;
  isActiveRightBar: boolean;
  setIsActiveRightBar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActiveLeftBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarLeft = ({
  isActiveLeftBar,
  setIsActiveLeftBar,
  isActiveRightBar,
  setIsActiveRightBar,
}: PropsType) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState<null | string>(null);
  const [activePlatform, setActivePlatform] = useState<null | string>(null);
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: portrait)');

    const handleOrientationChange = (event: MediaQueryListEvent) => {
      setIsPortrait(event.matches);
    };

    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const platformParam = searchParams.get('platform');

    setActiveCategory(categoryParam);
    setActivePlatform(platformParam);
  }, [location.search]);

  const activeHandler = useCallback(() => {
    setIsActiveLeftBar((prev) => !prev);
    if (isActiveRightBar) {
      setIsActiveRightBar(false);
    }
  }, [isActiveRightBar, setIsActiveLeftBar, setIsActiveRightBar]);

  const pageHandler = (pageNumber: number) => {
    dispatch(switchPage(pageNumber));
  };
  const boxStyle = isPortrait
    ? { left: '50%', transform: 'translateX(-50%)' }
    : {};
  return (
    <>
      <div className={classes.nav}>
        <div
          className={`${classes.nav__filter} ${
            isActiveLeftBar ? classes.arrowRotate : ''
          }`}
          onClick={activeHandler}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              activeHandler();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span /> <span /> <span />
        </div>
        <div
          className={`${classes.nav__container} ${
            isActiveLeftBar ? classes.active : ''
          } `}
          style={!isPortrait ? { flexDirection: 'row' } : {}}
        >
          <div
            className={classes[`nav__container--close`]}
            onClick={activeHandler}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Space') {
                activeHandler();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span />
            <span />
          </div>
          <div className={classes[`nav__container--box`]} style={boxStyle}>
            <FilterList
              data={gameCategories}
              activeHandler={activeHandler}
              pageHandler={pageHandler}
              activeCategory={activeCategory}
              title="category"
            />
          </div>
          <div className={classes[`nav__container--box`]} style={boxStyle}>
            <FilterList
              data={gamePlatforms}
              activeHandler={activeHandler}
              pageHandler={pageHandler}
              title="platform"
              activePlatform={activePlatform}
            />
          </div>
        </div>
      </div>
      <Modal show={isActiveLeftBar} handler={activeHandler} />
    </>
  );
};

export default NavBarLeft;
