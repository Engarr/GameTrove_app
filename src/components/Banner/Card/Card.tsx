import { SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './Card.module.scss';

interface PropsType {
  imageUrl: string;
  cardId: number;
  gameId?: number;
  setIsActive?: React.Dispatch<SetStateAction<boolean>>;
}

const Card = ({ imageUrl, cardId, setIsActive, gameId }: PropsType) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateElement = (event: MouseEvent) => {
    if (cardRef.current) {
      if (setIsActive) {
        setIsActive(false);
      }
      const cardRect = cardRef.current.getBoundingClientRect();
      // console.log(cardRect);
      const offsetX =
        ((event.pageX - cardRect.left) / cardRect.width - 0.5) * 50;
      const offsetY =
        ((event.pageY - cardRect.top) / cardRect.height - 0.5) * -50;

      cardRef.current.style.setProperty('--rotateX', `${offsetY}deg`);
      cardRef.current.style.setProperty('--rotateY', `${offsetX}deg`);
      cardRef.current.style.setProperty('--reset', '0');
    }
  };

  const resetRotation = () => {
    if (cardRef.current) {
      if (setIsActive) {
        setIsActive(true);
      }
      cardRef.current.style.setProperty('--rotateX', '15deg');
      cardRef.current.style.setProperty('--rotateY', '15deg');
      cardRef.current.style.setProperty('--reset', '0.5s');
    }
  };

  useEffect(() => {
    const cardElement = cardRef.current;

    if (cardElement) {
      cardElement.addEventListener('mousemove', rotateElement);
      cardElement.addEventListener('mouseleave', resetRotation);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousemove', rotateElement);
        cardElement.removeEventListener('mouseleave', resetRotation);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.img} id={`card-img-${cardId}`} ref={cardRef}>
      {gameId && <Link to={`/game/${gameId}`} />}
      <img
        src={imageUrl}
        alt="game_picture"
        loading="lazy"
        width={250}
        height={333}
      />
    </div>
  );
};
Card.defaultProps = {
  setIsActive: undefined,
  gameId: undefined,
};

export default Card;
