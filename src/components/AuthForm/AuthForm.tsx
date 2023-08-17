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
  const initialUserData = {
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
  };
  const [userData, setUserData] = useState<UserDataType>(initialUserData);
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBackendErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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
        const { status, data } = resData.error;

        if (status === 401) {
          toast.error(data.message);
        } else if (status === 422) {
          const errorsObj: { [key: string]: string } = {};
          data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
          setBackendErrors(errorsObj);
        }
      }
      if (resData.data) {
        const { token } = resData.data;
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('expiration', expiration.toISOString());
        toast.success('You have successfully logged in!');
        navigate('/');
        toast.success(
          isLogin
            ? 'You have successfully logged in!'
            : 'The account has been created. You can log in now'
        );
        navigate(isLogin ? '/' : '/account?mode=login');
      }
    } catch (err) {
      throw new Error(
        isLogin
          ? 'The user could not be authenticated'
          : 'Something went wrong, unable to create a new account'
      );
    }
  };
  const sendDemoRequest = async () => {
    try {
      const response = await postLoginUser({
        email: 'demo@poczta.pl',
        password: 'haslo123Q!',
      });

      const resData = response as AuthResponseType;
      if (resData.data) {
        const { token } = resData.data;
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('expiration', expiration.toISOString());
        toast.success('You have successfully logged in. Hello!');
        navigate('/');
      }
    } catch (err) {
      throw new Error('Something went wrong, please try again later');
    }
  };
  useEffect(() => {
    setUserData(initialUserData);
    setBackendErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const submutButtonContent =
    isRegisterLoading || isLoginLoading ? (
      <Loader message="Loading" color="black" />
    ) : (
      buttonContent
    );
  const switchLinkText = isLogin ? 'Sign up now' : 'Login';
  const switchLinkTo = isLogin
    ? '/account?mode=register'
    : '/account?mode=login';
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
                value={userData.userName}
                error={backendErrors.userName}
                classesCss={backendErrors.userName ? classes.error : ''}
              />
            )}

            <Input
              data="email"
              type="text"
              value={userData.email}
              onChange={handleUserDataChange}
              msg="Your email:"
              error={backendErrors.email}
              classesCss={backendErrors.email ? classes.error : ''}
            />
            <Input
              data="password"
              type="password"
              value={userData.password}
              onChange={handleUserDataChange}
              msg="Your password:"
              error={backendErrors.password}
              classesCss={backendErrors.password ? classes.error : ''}
            />

            {!isLogin && (
              <Input
                data="repeatPassword"
                type="password"
                value={userData.repeatPassword}
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
              <p>
                {isLogin
                  ? `Don't have an account?`
                  : `You already have an account?`}
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
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
