import { useState } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { BsFillClipboardHeartFill } from 'react-icons/bs';
import classes from './Tabs.module.scss';
import WishlistTab from './WishlistTab/WishlistTab';

const Tabs = () => {
  const [toggleState, setToggleState] = useState<number>(1);

  const tabsHandler = (index: number) => {
    setToggleState(index);
  };

  return (
    <div className={classes.container}>
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
          1
        </div>
        <div
          className={
            toggleState === 2
              ? `${classes.content}  ${classes.activeContent}`
              : classes.content
          }
        >
          <WishlistTab />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
