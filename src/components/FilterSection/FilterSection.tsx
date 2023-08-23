import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gameCategories, gamePlatforms } from '../../util/db';
import classes from './FilterSection.module.scss';
import { toggleActiveLeftNavBar } from '../../store/slice/UiSLice';
import updateLink from '../../util/changinParams';

interface PropsType {
  categoryParam: string;
  platformParam: string;
}
interface FilterType {
  id: number;
  name: string;
  genres?: string;
  platform?: string;
}

const FilterSection = ({ categoryParam, platformParam }: PropsType) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [sortCriteria, setSortCriteria] = useState('default');

  const findCategoryById = useCallback((categoryIdToFind: string) => {
    return gameCategories.find(
      (category) => category.id === Number(categoryIdToFind)
    );
  }, []);

  const findPlatformById = useCallback((platformIdToFind: string) => {
    return gamePlatforms.find(
      (platform) => platform.id === Number(platformIdToFind)
    );
  }, []);

  useEffect(() => {
    const updatedSearchParams = updateLink({
      item: sortCriteria,
      title: 'sort',
      localization: location,
    });
    navigate(updatedSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]);

  const foundCategory = findCategoryById(categoryParam);
  const foundPlatform = findPlatformById(platformParam);
  const resultArray = useCallback(() => {
    const arr = [];
    if (foundCategory) {
      arr.push(foundCategory);
    }
    if (foundPlatform) {
      arr.push(foundPlatform);
    }
    return arr as FilterType[];
  }, [foundCategory, foundPlatform]);

  const combinedResults = resultArray();

  const activeLeftNavBar = () => {
    dispatch(toggleActiveLeftNavBar());
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.filters}>
        <div>
          <h2>Filters:</h2>
        </div>
        <div className={classes.filters__container}>
          {combinedResults.map((item) => (
            <button
              key={item.id}
              className={classes[`filters__container--btn`]}
              onClick={activeLeftNavBar}
              type="button"
            >
              <p>{item.genres ? item.genres : item.platform}:</p>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <div className={classes.filters__sorting}>
          <p>Opcje sortowania:</p>
          <select
            name="sorting"
            id="sorting"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option
              value="default"
              className={classes[`filters__sorting--options`]}
            >
              Default sorting
            </option>
            <option value="top_rated">Top rated</option>
            <option value="lowest_rated">Lowest rated</option>
            <option value="first_release_date asc">
              Release date ascending
            </option>
            <option value="first_release_date desc">
              Release date descending
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
