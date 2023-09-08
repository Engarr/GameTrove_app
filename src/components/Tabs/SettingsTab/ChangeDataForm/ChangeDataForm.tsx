import React, { useEffect, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../../UI/Input/Input';
import classes from './ChangeDataForm.module.scss';
import { usePostUserChangesMutation } from '../../../../store/api/userSlice';
import { validateEmail, validatePassword } from '../../../../util/validation';
import { SettingsResponseType } from '../../../../Types/types';

interface PropsType {
  title: string;
  firstInputType: string;
  seccondInputType?: string;
  msgFirstInput: string;
  activeTab: number;
  msgSecondInput?: string;
  actionType: string;
}

interface UserDataInputType {
  newPassword: string;
  password: string;
  email: string;
}

export const ChangeDataForm = ({
  title,
  firstInputType,
  seccondInputType,
  msgFirstInput,
  activeTab,
  msgSecondInput,
  actionType,
}: PropsType) => {
  const token = useRouteLoaderData('root') as string;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataInputType>({
    newPassword: '',
    password: '',
    email: '',
  });
  const [isDataValid, setIsDataValid] = useState(true);
  const [postUserChanges, isLoading] = usePostUserChangesMutation();

  const [errorMsg, setErrorMsg] = useState<string | undefined>('');

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateData = () => {
    let isValid = true;
    if (actionType === 'changeEmail' && !validateEmail(userData.email)) {
      setIsDataValid(false);
      isValid = false;
    } else if (
      actionType === 'changePassword' &&
      !validatePassword(userData.newPassword)
    ) {
      isValid = false;
      setIsDataValid(false);
    }
    return isValid;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateData()) {
      try {
        const response = await postUserChanges({
          email: userData.email,
          password: userData.password,
          newPassword: userData.newPassword,
          actionType,
          token,
        });
        const resData = response as SettingsResponseType;
        if (resData.error) {
          toast.error(resData.error.data.msg);
        }
        if (resData.data) {
          toast.success(resData.data.msg);
          setUserData({ newPassword: '', password: '', email: '' });
          if (actionType === 'deleteAccount') {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            navigate('/account?mode=login');
          }
        }
      } catch (err) {
        throw new Error('Could save the changes');
      }
    }
  };
  useEffect(() => {
    if (!isDataValid && actionType === 'changeEmail') {
      setErrorMsg('Please enter a valid email address.');
    } else if (!isDataValid) {
      setErrorMsg(
        'The password must contain at least one capital letter and one special character and be longer than 5 characters'
      );
    }
  }, [actionType, isDataValid]);
  useEffect(() => {
    setUserData({
      newPassword: '',
      password: '',
      email: '',
    });
    setErrorMsg('');
    setIsDataValid(true);
  }, [activeTab]);
  return (
    <form onSubmit={onSubmit}>
      <h3>{title}</h3>
      <div className={classes.formBox__inputBox}>
        <Input
          onChange={inputValueHandler}
          data="password"
          type={firstInputType}
          msg={msgFirstInput}
          passwordInput={firstInputType === 'password'}
          error={undefined}
          value={userData.password}
        />
        {activeTab !== 0 && (
          <Input
            onChange={inputValueHandler}
            data={actionType === 'changeEmail' ? 'email' : 'newPassword'}
            type={seccondInputType || ''}
            msg={msgSecondInput || ''}
            passwordInput={seccondInputType === 'password'}
            error={errorMsg}
            value={
              actionType === 'changeEmail'
                ? userData.email
                : userData.newPassword
            }
          />
        )}
        <button type="submit" className={classes.saveBtn}>
          {actionType === 'deleteAccount' ? 'Delete account' : 'Save changes'}
        </button>
      </div>
    </form>
  );
};

export default ChangeDataForm;

ChangeDataForm.defaultProps = {
  seccondInputType: '',
  msgSecondInput: '',
};
