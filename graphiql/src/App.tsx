import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Sing from './Pages/Sign';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/NotFound';
import Layout from './components/Layout';
import { withTranslation } from 'react-i18next';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="/sing" element={<Sing />} />
          <Route path="/graphi" element={<Graphi />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MantineProvider>
  );
}

export default withTranslation()(App);
