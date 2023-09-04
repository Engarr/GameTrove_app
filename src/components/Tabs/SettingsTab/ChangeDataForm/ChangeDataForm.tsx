import React from 'react';
import Input from '../../../UI/Input/Input';
import classes from './ChangeDataForm.module.scss';

interface PropsType {
  title: string;
  firstInputType: string;
  seccondInputType?: string;
  msgFirstInput: string;
  activeTab: number;
  msgSecondInput?: string;
  onChange: () => void;
}

export const ChangeDataForm = ({
  title,
  firstInputType,
  seccondInputType,
  msgFirstInput,
  activeTab,
  msgSecondInput,
  onChange,
}: PropsType) => {
  return (
    <>
      <h3>{title}</h3>
      <div className={classes.formBox__inputBox}>
        <Input
          onChange={onChange}
          data={firstInputType}
          type={firstInputType}
          msg={msgFirstInput}
          passwordInput={firstInputType === 'password'}
          error={undefined}
          value=""
        />
        {activeTab !== 0 && (
          <Input
            onChange={() => {}}
            data={seccondInputType || ''}
            type={seccondInputType || ''}
            msg={msgSecondInput || ''}
            passwordInput
            error={undefined}
            value=""
          />
        )}
        <button type="button">Save changes</button>
      </div>
    </>
  );
};

export default ChangeDataForm;

ChangeDataForm.defaultProps = {
  seccondInputType: '',
  msgSecondInput: '',
};
