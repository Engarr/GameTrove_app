import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './GameDetailBanner.module.scss';
import { GameDetailType } from '../../Types/types';
import bgc from '../../asset/bgc.png';
import bgcLight from '../../asset/bgc-light.png';
import { colorMode } from '../../store/slice/ThemeSlice';
import Card from '../Banner/Card/Card';
import ErrorComponent from '../Spinner/ErrorComponent/ErrorComponent';
import Wishlist from '../Wishlist/Wishlist';
import DivLoader from '../Spinner/SkeletonDivLoader/DivLoader';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isError: boolean;
}

const GameDetailBanner = ({ data, isLoading, isError }: PropsType) => {
  const mode = useSelector(colorMode);
  const param = useParams<{ gameId: string }>();
  const gameId = param.gameId as string;
  let content;
  if (isLoading) {
    content = (
      <div className={classes.loadingBox}>
        <div className={classes.loadingBox__card}>
          <DivLoader />
        </div>
        <div className={classes.loadingBox__textBox}>
          <DivLoader />
        </div>
        <img
          src={mode === 'dark' ? bgc : bgcLight}
          alt=""
          height={20}
          className={classes.banner__img}
        />
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorComponent message="Data loading error. Please try again later" />
    );
  } else if (data) {
    const imageUrl = data.cover
      ? data.cover.url.replace('t_thumb', 't_1080p')
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgxr1R7VtfzTnb7T1xo3RWbgrPNbf3RgvJ63abVkeyzxq1gLGb50lacEnZof8bSf4h4Ww&usqp=CAU';

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
          <Card imageUrl={imageUrl} cardId={data.id} />
        </div>
        <div className={classes.productContainer__name}>
          <h1>{data.name}</h1>

          <p>
            <span>Release date:</span> {month} {year}
          </p>
          <Wishlist gameId={gameId} />
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default GameDetailBanner;
