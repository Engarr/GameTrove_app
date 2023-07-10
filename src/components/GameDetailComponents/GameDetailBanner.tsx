import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import classes from './GameDetailBanner.module.scss';
import { GameDetailType } from '../../Types/types';
import Spiner from '../Spinner/Spiner';
import bgc from '../../asset/bgc.png';
import bgcLight from '../../asset/bgc-light.png';
import { colorMode } from '../../store/slice/ThemeSlice';
import Card from '../Banner/Card/Card';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}
const GameDetailBanner = ({ data, isLoading, isError }: PropsType) => {
  const mode = useSelector(colorMode);
  let content;
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

    content = (
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
    );
  }
  return <div>{content}</div>;
};

export default GameDetailBanner;
