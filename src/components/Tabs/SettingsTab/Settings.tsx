import { useState } from 'react';
import { PiTrashSimpleDuotone, PiPassword } from 'react-icons/pi';
import { Form } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import classes from './Settings.module.scss';
import { settingArr } from '../../../util/db';
import { ChangeDataForm as DataChangeForm } from './ChangeDataForm/ChangeDataForm';
import FormWrapper from '../../FormWrapper/FormWrapper';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [settings, setSettings] = useState(settingArr[activeTab]);

  const activeTabHandler = (number: number) => {
    setSettings(settingArr[number]);
    setActiveTab(number);
  };

  return (
    <div className={classes.container}>
      <h2>Account management center</h2>
      <div className={classes.wrapper}>
        <div className={classes.tabsBox}>
          <button
            type="button"
            onClick={activeTabHandler.bind(this, 1)}
            className={activeTab === 1 ? classes.active : ''}
          >
            Change Password
            <PiPassword
              className={`${classes.tabsBox__icon} ${
                activeTab === 1 ? classes.activeIcon : ''
              }`}
            />
          </button>
          <button
            type="button"
            onClick={activeTabHandler.bind(this, 2)}
            className={activeTab === 2 ? classes.active : ''}
          >
            Change Email
            <MdAlternateEmail
              className={`${classes.tabsBox__icon} ${
                activeTab === 2 ? classes.activeIcon : ''
              }`}
            />
          </button>
          <button
            type="button"
            onClick={activeTabHandler.bind(this, 0)}
            className={activeTab === 0 ? classes.active : ''}
          >
            Delete Account
            <PiTrashSimpleDuotone
              className={`${classes.tabsBox__icon} ${
                activeTab === 0 ? classes.activeIcon : ''
              }`}
            />
          </button>
          <Form action="/logout" method="post">
            <button className={classes.logoutButton} type="submit">
              Logout
              <AiOutlineLogout className={classes[`nav__buttons--icon`]} />
            </button>
          </Form>
        </div>
        <div className={classes.formBox}>
          <FormWrapper>
            <DataChangeForm
              title={settings.title}
              activeTab={activeTab}
              firstInputType={settings.firstInputType}
              msgFirstInput={settings.msgFirstInput}
              seccondInputType={settings.seccondInputType}
              msgSecondInput={settings.msgSecondInput}
              actionType={settings.action}
            />
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default Settings;
