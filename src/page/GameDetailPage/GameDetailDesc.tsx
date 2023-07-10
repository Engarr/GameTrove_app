import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './GameDetailDesc.module.scss';
import { GameDetailType } from '../../Types/types';

interface PropsType {
  data: GameDetailType;
  isLoading: boolean;
}
const GameDetailDesc = ({ data, isLoading }: PropsType) => {
  const [substring, setSubstring] = useState(100);
  const [animatedText, setAnimatedText] = useState('');
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
    }, 5);

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
  let content;
  if (!isLoading && data) {
    const descLength = data.summary.length;

    content = (
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
            className={classes[`productContainer__descriptionBox--summary-box`]}
          >
            {data.summary ? (
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
