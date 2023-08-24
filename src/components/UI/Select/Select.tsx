import { useRef, useState, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import classes from './Select.module.scss';

interface PropsType {
  optionsArr: {
    title: string;
    value: string;
    icon: JSX.Element;
  }[];
  selectedOption: string;
  setValue: (value: string, title: string) => void;
}

const Select = ({ optionsArr, setValue, selectedOption }: PropsType) => {
  //   const [selectedOption, setSelectedOption] = useState('Default sorting');
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const visibleHandler = () => {
    setIsVisible((prev) => !prev);
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const arrowStyle = isVisible ? classes.arrowRotate : '';

  return (
    <div className={classes.container} ref={selectRef}>
      <div className={classes.container__header}>
        <button onClick={visibleHandler} type="button">
          <p>{selectedOption}</p>
          <RiArrowDownSLine
            className={`${arrowStyle} ${classes[`container__header--arrow`]}`}
          />
        </button>
      </div>
      {isVisible && (
        <div className={classes.container__optionsBox}>
          {optionsArr.map((option) => (
            <button
              key={option.title}
              onClick={() => {
                setValue(option.title, option.value);
                visibleHandler();
              }}
              type="button"
            >
              {option.icon}
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
