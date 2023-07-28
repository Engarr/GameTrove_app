import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.scss';
import { usePutRegisterUserMutation } from '../../store/api/userSlice';
import { AuthResponseType, ErrorsData } from '../../Types/types';
import Input from '../UI/input';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [fadeIn, setFadeIn] = useState(false);
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const [putRegisterUser, { isLoading: isRegisterLoading }] =
    usePutRegisterUserMutation();

  const isLogin = mode === 'login';
  const buttonContent = mode === 'login' ? 'Login' : 'Register';
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setBackendErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };
  useEffect(() => {
    setFadeIn(true);

    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [mode]);

  useEffect((e: React.ChangeEvent<HTMLInputElement>) => {}, [userData]);
  const userDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { userName, email, password, repeatPassword } = userData;
      const response = await putRegisterUser({
        userName,
        email,
        password,
        repeatPassword,
      });
      const resData = response as AuthResponseType;
      if (resData.error.status === 422 || resData.error.status === 401) {
        const errorsObj: { [key: string]: string } = {};
        resData.error.data.errors.forEach((error) => {
          errorsObj[error.path] = error.msg;
        });
        setBackendErrors(errorsObj);
      }
    } catch (err) {
      throw new Error(
        isLogin
          ? 'The user could not be authenticated'
          : 'Something went wrong, unable to create a new account'
      );
    }
  };
  return (
    <section className={classes.authWrapper}>
      <div className={classes.card}>
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.card__inner}>
          <form onSubmit={userDataSubmit} className={classes.formBox}>
            <h4 className={fadeIn ? classes.fadeIn : ''}>{mode}</h4>
            <Input
              data="userName"
              type="text"
              onChange={handleUserDataChange}
              msg="Your name:"
              error={backendErrors.userName}
              classesCss={backendErrors.userName ? classes.error : ''}
            />
            <Input
              data="email"
              type="text"
              onChange={handleUserDataChange}
              msg="Your email:"
              error={backendErrors.email}
              classesCss={backendErrors.email ? classes.error : ''}
            />
            <Input
              data="password"
              type="password"
              onChange={handleUserDataChange}
              msg="Your password:"
              error={backendErrors.password}
              classesCss={backendErrors.password ? classes.error : ''}
            />

            {!isLogin && (
              <Input
                data="repeatPassword"
                type="password"
                onChange={handleUserDataChange}
                msg="Repeat password:"
                error={backendErrors.repeatPassword}
                classesCss={backendErrors.repeatPassword ? classes.error : ''}
              />
            )}
            <button type="submit" className={fadeIn ? classes.fadeIn : ''}>
              {buttonContent}
            </button>
            <div className={classes.formBox__switch}>
              {isLogin ? (
                <p>
                  Don&apos;t have an account?
                  <Link to="/account?mode=register">Sign up now</Link>
                </p>
              ) : (
                <p>
                  You already have account?
                  <Link to="/account?mode=login">Login</Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
