import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../../components/Nav/Nav/Nav';

const RootLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <section>
      <Nav />
      <Outlet />
    </section>
  );
};

export default RootLayout;
