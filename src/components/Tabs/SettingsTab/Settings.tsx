import { useState } from 'react';
import { PiTrashSimpleDuotone, PiPassword } from 'react-icons/pi';
import { MdAlternateEmail } from 'react-icons/md';
import classes from './Settings.module.scss';
import { settingArr } from '../../../util/db';
import { ChangeDataForm as Form } from './ChangeDataForm/ChangeDataForm';

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
        </div>
        <div className={classes.formBox}>
          <Form
            title={settings.title}
            activeTab={activeTab}
            firstInputType={settings.firstInputType}
            msgFirstInput={settings.msgFirstInput}
            seccondInputType={settings.seccondInputType}
            msgSecondInput={settings.msgSecondInput}
            actionType={settings.action}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
