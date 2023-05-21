import { Outlet } from 'react-router-dom';
import AppHeader from './Header/Header';
import Footer from './Footer';
import { AppShell } from '@mantine/core';

const Layout = () => {
  return (
    <AppShell header={<AppHeader />} footer={<Footer />}>
      <Outlet />
    </AppShell>
  );
};

export default Layout;
