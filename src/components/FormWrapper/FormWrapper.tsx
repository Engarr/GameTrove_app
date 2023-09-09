import React, { ReactNode } from 'react';
import classes from './FormWraper.module.scss';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className={classes.authWrapper}>
      <div className={classes.card}>
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.card__inner}>{children}</div>
      </div>
    </div>
  );
};

export default FormWrapper;
