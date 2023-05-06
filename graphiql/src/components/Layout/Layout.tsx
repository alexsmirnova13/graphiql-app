import { Outlet } from 'react-router-dom';
import s from './layout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={s.layout}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
