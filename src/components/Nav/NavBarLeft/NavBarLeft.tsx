import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import classes from './NavBarLeft.module.scss';
import Modal from '../../Modal/Modal';
import { gameCategories, gamePlatforms } from '../../../util/db';

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

  const activeHandler = () => {
    setIsActiveLeftBar((prev) => !prev);
    if (isActiveRightBar) {
      setIsActiveRightBar(false);
    }
  };

  return (
    <>
      <div className={classes.nav}>
        <div
          className={`${classes.nav__container} ${
            isActiveLeftBar ? classes.active : ''
          } `}
          style={!isPortrait ? { display: 'block' } : {}}
        >
          <h3>Search games by category:</h3>
          <div className={classes[`nav__container--categorys`]}>
            {gameCategories.map((category) => {
              const searchParams = new URLSearchParams(location.search);
              searchParams.set('category', category.category);
              const updatedSearch = `?${searchParams
                .toString()
                .toLocaleLowerCase()
                .toString()}`;

              return (
                <div
                  key={category.id}
                  className={
                    activeCategory === category.category.toLocaleLowerCase()
                      ? classes.activeButton
                      : ''
                  }
                >
                  <Link to={updatedSearch}>
                    <button type="button">{category.category}</button>
                  </Link>
                </div>
              );
            })}
          </div>
          <h3>Search games by platform:</h3>
          <div className={classes[`nav__container--platforms`]}>
            {gamePlatforms.map((platform) => {
              const searchParams = new URLSearchParams(location.search);
              searchParams.set('platform', platform.platform);
              const updatedSearch = `?${searchParams
                .toString()
                .toLocaleLowerCase()}`;

              return (
                <div
                  key={platform.id}
                  className={
                    activePlatform === platform.platform.toLocaleLowerCase()
                      ? classes.activeButton
                      : ''
                  }
                >
                  <Link to={updatedSearch}>
                    <button type="button">{platform.platform}</button>
                  </Link>
                </div>
              );
            })}
          </div>

          <IoIosArrowForward
            className={`${classes.arrow} ${
              isActiveLeftBar ? classes.arrowRotate : ''
            }`}
            onClick={activeHandler}
          />
        </div>
      </div>
      <Modal show={isActiveLeftBar} handler={activeHandler} />
    </>
  );
};

export default NavBarLeft;
