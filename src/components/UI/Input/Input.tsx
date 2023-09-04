import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import classes from './input.module.scss';

interface PropsType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: string;
  type: string;
  msg: string;
  error: string | undefined;
  value: string;
  passwordInput?: boolean;
}

const Input = ({
  onChange,
  data,
  type,
  msg,
  error,
  value,
  passwordInput,
}: PropsType) => {
  const [isHidePassword, setIsHidePassword] = useState(true);

  const visibleHandler = () => {
    setIsHidePassword((prev) => !prev);
  };

  return (
    <div className={classes.inputBox}>
      <label htmlFor={data}>
        {msg}
        <div className={classes.inputBox__input}>
          <input
            type={passwordInput && !isHidePassword ? 'text' : type}
            id={data}
            name={data}
            onChange={onChange}
            value={value}
            className={error && classes.error}
          />
          {passwordInput && (
            <div className={classes.eyeBox}>
              {isHidePassword ? (
                <AiFillEyeInvisible onClick={visibleHandler} />
              ) : (
                <AiFillEye onClick={visibleHandler} />
              )}
            </div>
          )}
        </div>
      </label>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
Input.defaultProps = {
  passwordInput: false,
};
