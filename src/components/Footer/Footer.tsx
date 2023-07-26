import { Link } from 'react-router-dom';
import {
  BiLogoFacebook,
  BiLogoInstagramAlt,
  BiLogoTwitter,
} from 'react-icons/bi';
import { IoGameControllerOutline } from 'react-icons/io5';

import classes from './Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  console.log(year);
  return (
    <section className={classes.footerContainer}>
      <div className={classes.footerContainer__logo}>
        <Link to="/">
          <p>GameTrove</p>
          <IoGameControllerOutline
            className={classes[`footerContainer__logo--icon`]}
          />
        </Link>
      </div>
      <div className={classes.footerContainer__rights}>
        <p>
          Copyright © <span>{year}</span>
        </p>
      </div>
      <div className={classes.footerContainer__socialBox}>
        <Link to="/">
          <BiLogoFacebook />
        </Link>
        <Link to="/">
          <BiLogoInstagramAlt />
        </Link>
        <Link to="/">
          <BiLogoTwitter />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
