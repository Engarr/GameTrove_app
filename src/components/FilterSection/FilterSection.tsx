import React, { useCallback } from 'react';
import { gameCategories, gamePlatforms } from '../../util/db';
import classes from './FilterSection.module.scss';

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

  return (
    <div className={classes.wrapper}>
      <div className={classes.filters}>
        <div>
          <h2>Filters:</h2>
        </div>
        <div className={classes.filters__container}>
          {combinedResults.map((item) => (
            <div key={item.id} className={classes[`filters__container--box`]}>
              <p>{item.genres ? item.genres : item.platform}:</p>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
