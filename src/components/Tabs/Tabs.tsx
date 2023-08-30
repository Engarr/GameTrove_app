import { useState, useEffect } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { BsFillClipboardHeartFill } from 'react-icons/bs';
import classes from './Tabs.module.scss';
import WishlistTab from './WishlistTab/WishlistTab';
import Settings from './SettingsTab/Settings';

const Tabs = () => {
  const [toggleState, setToggleState] = useState<number>(1);
  const [skipSearch, setSkipSearch] = useState(true);

  const tabsHandler = (index: number) => {
    setToggleState(index);
  };
  useEffect(() => {
    if (toggleState === 2) {
      setSkipSearch(false);
      return;
    }
    setSkipSearch(true);
  }, [toggleState]);

  return (
    <section className={classes.container}>
      <div className={classes.container____blocTtabs}>
        <button
          type="button"
          onClick={() => {
            tabsHandler(1);
          }}
          className={toggleState === 1 ? classes.activeTab : ''}
        >
          Settings
          <IoOptionsOutline
            className={classes[`container____blocTtabs--icons`]}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            tabsHandler(2);
          }}
          className={toggleState === 2 ? classes.activeTab : ''}
        >
          Wishlist
          <BsFillClipboardHeartFill
            className={classes[`container____blocTtabs--icons`]}
          />
        </button>
      </div>
      <div className={classes.container__contentTabs}>
        <div
          className={
            toggleState === 1
              ? `${classes.content}  ${classes.activeContent}`
              : classes.content
          }
        >
          <Settings />
        </div>
        <div
          className={
            toggleState === 2
              ? `${classes.content}  ${classes.activeContent}`
              : classes.content
          }
        >
          <WishlistTab skipSearch={skipSearch} />
        </div>
      </div>
    </section>
  );
};

export default Tabs;
