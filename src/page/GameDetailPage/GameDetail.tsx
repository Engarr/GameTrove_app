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
import Slider from '../../components/Slider/Slider';

interface DataType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const GameDetail = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [substring, setSubstring] = useState(100);
  const [animatedText, setAnimatedText] = useState('');
  const param = useParams();
  const { gameId } = param;
  const mode = useSelector(colorMode);
  let content;

  const { data, isLoading, isError } = useGetGameDetailsQuery<DataType>(
    gameId as string
  );

  const animateText = (text: string) => {
    let currentText = '';
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setAnimatedText(currentText);
        currentIndex += 1;
      } else {
        clearInterval(animationInterval);
      }
    }, 12);

    return () => {
      clearInterval(animationInterval);
    };
  };

  useEffect(() => {
    if (data) {
      animateText(data.summary.substring(100, substring));
    }
  }, [data, substring]);
  const substringHandler = () => {
    if (substring === 100) {
      setSubstring(data?.summary.length || 0);
    } else {
      setSubstring(100);
      setAnimatedText('');
    }
  };
  if (isLoading) {
    content = (
      <div className={classes.spinnerContainer}>
        <Spiner message="Loading..." />
      </div>
    );
  } else if (isError) {
    content = (
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
    const screenshotsUrl = data.screenshots.map((screen) => ({
      id: screen.id,
      url: screen.url.replace('t_thumb', 't_1080p'),
    }));
    const descLength = data.summary.length;

    content = (
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

            <AiFillHeart className={classes[`productContainer__name--heart`]} />
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

          <div className={classes[`productContainer__descriptionBox--summary`]}>
            <h3>Description:</h3>
            <div
              className={
                classes[`productContainer__descriptionBox--summary-box`]
              }
            >
              {data.summary ? (
                <p>
                  {data.summary.substring(0, 100)}
                  {animatedText}
                  <span
                    onClick={substringHandler}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        substringHandler();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {substring !== descLength ? 'read more.' : '<-'}
                  </span>
                </p>
              ) : (
                <p>Unfortunately, the game does not have a description yet.</p>
              )}
            </div>
          </div>
        </div>
        <Slider
          setActiveIndex={setActiveIndex}
          screenShotsLength={data.screenshots.length}
          activeIndex={activeIndex}
          screenshotsUrl={screenshotsUrl}
        />
      </div>
    );
  }

  return <section className={classes.wrapper}>{content}</section>;
};

export default GameDetail;
