import { Outlet } from 'react-router-dom';
import AppHeader from './Header/Header';
import Footer from './Footer';
import { AppShell } from '@mantine/core';

const Layout = () => {
  return (
    <>
      <AppHeader />
      <AppShell>
        <Outlet />
      </AppShell>
      <Footer />
    </>
  );
};

export default Layout;
