import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { colorMode } from '../../store/slice/ThemeSlice';
import Nav from '../../components/Nav/Nav/Nav';

const RootLayout = () => {
  const mode = useSelector(colorMode);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <section className={mode === 'light' ? 'light' : 'dark'}>
      <Nav />
      <Outlet />
    </section>
  );
};

export default RootLayout;
