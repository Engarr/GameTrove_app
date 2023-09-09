import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  usePutRegisterUserMutation,
  usePostLoginUserMutation,
} from '../../store/api/userSlice';
import { AuthResponseType, ErrorsData, UserDataType } from '../../Types/types';
import Loader from '../UI/Loader/Loader';
import Form from './Form/Form';
import FormWrapper from '../FormWrapper/FormWrapper';
import classes from './AuthForm.module.scss';

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
        if (isLogin) {
          const { token } = resData.data;
          localStorage.setItem('token', token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 24);
          localStorage.setItem('expiration', expiration.toISOString());
          navigate('/');
        } else {
          navigate('/account?mode=login');
        }

        toast.success(
          isLogin
            ? 'You have successfully logged in!'
            : 'The account has been created. You can log in now'
        );
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

  return (
    <section className={classes.wrapper}>
      <div className={classes.wrapper__formContainer}>
        <FormWrapper>
          <Form
            backendErrors={backendErrors}
            userData={userData}
            isLogin={isLogin}
            fadeIn={fadeIn}
            mode={mode}
            onSubmit={userDataSubmit}
            onDataChange={handleUserDataChange}
            sendDemoRequest={sendDemoRequest}
            submutButtonContent={submutButtonContent}
          />
        </FormWrapper>
      </div>
    </section>
  );
};

export default AuthForm;
