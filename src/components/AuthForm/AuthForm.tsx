import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classes from './AuthForm.module.scss';
import {
  usePutRegisterUserMutation,
  usePostLoginUserMutation,
} from '../../store/api/userSlice';
import { AuthResponseType, ErrorsData, UserDataType } from '../../Types/types';
import Input from '../UI/Input';
import Loader from '../Spinner/Loader/Loader';

const AuthForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [fadeIn, setFadeIn] = useState(false);
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const [putRegisterUser, { isLoading: isRegisterLoading }] =
    usePutRegisterUserMutation();
  const [postLoginUser, { isLoading: isLoginLoading }] =
    usePostLoginUserMutation();

  const isLogin = mode === 'login';
  const buttonContent = mode === 'login' ? 'Login' : 'Register';
  const [userData, setUserData] = useState<UserDataType>({
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

  const userDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { userName, email, password, repeatPassword } = userData;

      const response = isLogin
        ? await postLoginUser({ email, password })
        : await putRegisterUser({ userName, email, password, repeatPassword });
      const resData = response as AuthResponseType;
      if (resData.error) {
        if (resData.error.status === 401) {
          toast.error(resData.error.data.message);
          return;
        }
        if (resData.error.status === 422 || resData.error.status === 401) {
          const errorsObj: { [key: string]: string } = {};
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });

          setBackendErrors(errorsObj);
        }
      }
      if (resData.data) {
        if (isLogin) {
          const { token } = resData.data;
          localStorage.setItem('token', token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 24);
          localStorage.setItem('expiration', expiration.toISOString());
          toast.success('You have successfully logged in!');
          navigate('/');
        } else {
          toast.success('The account has been created. You can log in now');
          navigate('/account?mode=login');
        }
      }
    } catch (err) {
      throw new Error(
        isLogin
          ? 'The user could not be authenticated'
          : 'Something went wrong, unable to create a new account'
      );
    }
  };
  useEffect(() => {
    setUserData({
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
    setBackendErrors({
      email: '',
      password: '',
      repeatPassword: '',
    });
  }, [isLogin]);
  const submutButtonContent =
    isRegisterLoading || isLoginLoading ? (
      <Loader message="Loading" color="black" />
    ) : (
      buttonContent
    );

  return (
    <section className={classes.authWrapper}>
      <div className={classes.card}>
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.card__inner}>
          <form onSubmit={userDataSubmit} className={classes.formBox}>
            <h4 className={fadeIn ? classes.fadeIn : ''}>{mode}</h4>
            {!isLogin && (
              <Input
                data="userName"
                type="text"
                onChange={handleUserDataChange}
                msg="Your name:"
                error={backendErrors.userName}
                classesCss={backendErrors.userName ? classes.error : ''}
              />
            )}

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
              {submutButtonContent}
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
