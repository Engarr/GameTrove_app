import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { useGetGameDetailsQuery } from '../../store/api/feedSlice';
import classes from './GameDetail.module.scss';
import Spiner from '../../components/Spinner/Spiner';
import { GameDetailType } from '../../Types/types';
import Card from '../../components/Banner/Card/Card';
import bgc from '../../asset/bgc.png';
import bgcLight from '../../asset/bgc-light.png';
import { colorMode } from '../../store/slice/ThemeSlice';

interface DataType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const GameDetail = () => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const param = useParams();
  const { gameId } = param;
  const mode = useSelector(colorMode);

  const { data, isLoading, isError } = useGetGameDetailsQuery<DataType>(
    gameId as string
  );

  useEffect(() => {
    if (isLoading) {
      setContent(
        <div className={classes.spinnerContainer}>
          <Spiner message="Loading..." />
        </div>
      );
    } else if (isError) {
      setContent(
        <div className={classes.errorContainer}>
          <h3>
            <span>Error:</span>
            There was a problem retrieving information. Try refreshing the page
          </h3>
        </div>
      );
    } else if (data) {
      const imageUrl = data.cover.url.replace('t_thumb', 't_1080p');
      const timestamp = data.first_release_date;
      const date = new Date(timestamp * 1000);
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      setContent(
        <div className={classes.productContainer}>
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={classes.productContainer__background}
          >
            <div className={classes[`productContainer__background--shadow`]} />
            <img
              src={mode === 'dark' ? bgc : bgcLight}
              alt=""
              height={30}
              className={classes.productContainer__transition}
            />
            <div className={classes.productContainer__cardBox}>
              <Card imageUrl={imageUrl} cardId={data.cover.id} />
            </div>
            <div className={classes.productContainer__name}>
              <h1>{data.name}</h1>

              <p>
                <span>Release date:</span> {month} {year}
              </p>

              <AiFillHeart
                className={classes[`productContainer__name--heart`]}
              />
            </div>
          </div>
          <div className={classes.productContainer__descriptionBox}>
            <h2>About the game:</h2>
            <div className={classes[`productContainer__descriptionBox--genre`]}>
              <h3>Genre: </h3>
              {data.genres.map((genre) => (
                <Link to="/" key={genre.id}>
                  {genre.name}
                </Link>
              ))}
            </div>

            <div
              className={classes[`productContainer__descriptionBox--storyline`]}
            >
              <h3>Storyline:</h3>
              <div
                className={
                  classes[`productContainer__descriptionBox--storyline-box`]
                }
              >
                {data.storyline ? (
                  <p>{data.storyline}</p>
                ) : (
                  <p>
                    Unfortunately, the game does not have a plot description
                    yet.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={classes.screenshotsContainer}>tu</div>
        </div>
      );
    }
  }, [isLoading, isError, data, mode]);

  return <section className={classes.wrapper}>{content}</section>;
};

export default GameDetail;
