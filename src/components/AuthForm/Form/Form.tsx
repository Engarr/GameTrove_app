import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../UI/Input/Input';
import classes from './Form.module.scss';
import { ErrorsData, UserDataType } from '../../../Types/types';

interface PropsType {
  userData: UserDataType;
  backendErrors: ErrorsData;
  isLogin: boolean;
  fadeIn: boolean;
  mode: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendDemoRequest: () => void;
  submutButtonContent: string | JSX.Element;
}

const Form = ({
  backendErrors,
  userData,
  isLogin,
  fadeIn,
  mode,
  onSubmit,
  onDataChange,
  submutButtonContent,
  sendDemoRequest,
}: PropsType) => {
  const switchLinkText = isLogin ? 'Sign up now' : 'Login';
  const switchLinkTo = isLogin
    ? '/account?mode=register'
    : '/account?mode=login';
  return (
    <form onSubmit={onSubmit} className={classes.formBox}>
      <h4 className={fadeIn ? classes.fadeIn : ''}>{mode}</h4>
      {!isLogin && (
        <Input
          data="userName"
          type="text"
          onChange={onDataChange}
          msg="Your name:"
          value={userData.userName}
          error={backendErrors.userName}
          classesCss={backendErrors.userName ? classes.error : ''}
        />
      )}

      <Input
        data="email"
        type="text"
        value={userData.email}
        onChange={onDataChange}
        msg="Your email:"
        error={backendErrors.email}
        classesCss={backendErrors.email ? classes.error : ''}
      />
      <Input
        data="password"
        type="password"
        value={userData.password}
        onChange={onDataChange}
        msg="Your password:"
        error={backendErrors.password}
        classesCss={backendErrors.password ? classes.error : ''}
      />

      {!isLogin && (
        <Input
          data="repeatPassword"
          type="password"
          value={userData.repeatPassword}
          onChange={onDataChange}
          msg="Repeat password:"
          error={backendErrors.repeatPassword}
          classesCss={backendErrors.repeatPassword ? classes.error : ''}
        />
      )}
      <button type="submit" className={fadeIn ? classes.fadeIn : ''}>
        {submutButtonContent}
      </button>
      <div className={classes.formBox__switch}>
        <p>
          {isLogin ? `Don't have an account?` : `You already have an account?`}
          <Link to={switchLinkTo}>{switchLinkText}</Link>
        </p>
        <button
          type="button"
          className={classes.demoButton}
          onClick={sendDemoRequest}
        >
          Try demo
        </button>
      </div>
    </form>
  );
};

export default Form;
