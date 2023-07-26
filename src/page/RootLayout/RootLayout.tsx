import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../../components/Nav/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const RootLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <section>
      <Nav />
      <Outlet />
      <Footer />
    </section>
  );
};

export default RootLayout;
