import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classes from './GameDetailDesc.module.scss';
import { GameDetailType } from '../../../Types/types';
import GameDetailLoader from './GameDetailLoader/GameDetailLoader';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
  isFetching: boolean;
}
const GameDetailDesc = ({ data, isLoading, isFetching }: PropsType) => {
  const [substring, setSubstring] = useState(100);
  const [animatedText, setAnimatedText] = useState('');

  const animateText = useCallback((text: string) => {
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
    }, 5);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  useEffect(() => {
    if (data && data.summary) {
      animateText(data.summary.substring(100, substring));
    }
  }, [data, substring, animateText]);

  const substringHandler = () => {
    if (substring === 100) {
      setSubstring(data?.summary.length || 0);
    } else {
      setSubstring(100);
      setAnimatedText('');
    }
  };
  let content;
  if (isLoading || isFetching) {
    content = <GameDetailLoader />;
  } else if (!isLoading && data) {
    let descLength;
    if (data.summary) {
      descLength = data.summary.length;
    }

    content = (
      <div className={classes.productContainer__descriptionBox}>
        <h2 className="showUp">About the game:</h2>
        <div className={classes[`productContainer__descriptionBox--genre`]}>
          <div>
            <h3>Genre: </h3>
            {data.genres &&
              data.genres.map((genre) => (
                <Link to={`/games?category=${genre.id}`} key={genre.id}>
                  {genre.name}
                </Link>
              ))}
          </div>
          <div>
            <h3>Platforms:</h3>
            {data.platforms &&
              data.platforms.map((platform) => (
                <Link to={`/games?platform=${platform.id}`} key={platform.id}>
                  {platform.name}
                </Link>
              ))}
          </div>
        </div>

        <div className={classes[`productContainer__descriptionBox--summary`]}>
          <h3>Description:</h3>
          <div
            className={classes[`productContainer__descriptionBox--summary-box`]}
          >
            {data.summary && descLength ? (
              <p>
                {data.summary.substring(0, 100)}
                {animatedText}
                {descLength > 100 && (
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
                    {substring === descLength ? '<-' : 'read more..'}
                  </span>
                )}
              </p>
            ) : (
              <p>Unfortunately, the game does not have a description yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default GameDetailDesc;
