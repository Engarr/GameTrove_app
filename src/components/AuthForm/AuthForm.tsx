import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.scss';
import { usePutRegisterUserMutation } from '../../store/api/userSlice';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [fadeIn, setFadeIn] = useState(false);
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
      const response = await putRegisterUser({
        userName,
        email,
        password,
        repeatPassword,
      });
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
            <div>
              <label htmlFor="userName">
                Your name:
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={handleUserDataChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Your email:
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleUserDataChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Your password:
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={handleUserDataChange}
                />
              </label>
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="repeatPassword">
                  Repeat Your password:
                  <input
                    type="text"
                    id="repeatPassword"
                    name="repeatPassword"
                    onChange={handleUserDataChange}
                  />
                </label>
              </div>
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
