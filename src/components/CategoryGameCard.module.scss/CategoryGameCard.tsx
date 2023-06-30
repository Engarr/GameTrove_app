import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import classes from './CategoryGameCard.module.scss';
import { useGetNewCategoryGamesQuery } from '../../store/api/feedSlice';
import { CategoryGameData } from '../../Types/types';
import Spiner from '../Spinner/Spiner';

const CategoryGameCard = () => {
  const { data, isLoading, isError } =
    useGetNewCategoryGamesQuery<CategoryGameData>();

  let content;
  if (isLoading) {
    content = (
      <div className={classes.spinnerContainer}>
        <Spiner message="Loading" />
      </div>
    );
  } else if (isError) {
    content = (
      <h3>
        Error: There was a problem retrieving information. Try refreshing the
        page
      </h3>
    );
  } else if (data) {
    content = (
      <div className={classes.container}>
        <button type="button" className={classes.container__preBtn}>
          <IoIosArrowBack className={classes[`container__preBtn--icon`]} />
        </button>
        <button type="button" className={classes.container__nextBtn}>
          <IoIosArrowForward className={classes[`container__nextBtn--icon`]} />
        </button>

        <div className={classes.gameSlider}>
          {data.newsGames.map((game) => {
            const imageUrl = game.cover.url.replace('t_thumb', 't_720p');

            return (
              <div className={classes.gameSlider__cardBox} key={game.id}>
                <img src={imageUrl} alt={game.name} width={250} />
                {/* <p>{game.name}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <h2>
        Game news in the category: <span>{data && data.category.name}</span>
      </h2>

      {content}
    </div>
  );
};

export default CategoryGameCard;
