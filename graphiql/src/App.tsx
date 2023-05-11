import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Sing from './Pages/Sign';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/Page404/404';
import Layout from './components/Layout';
import { withTranslation } from 'react-i18next';
import {
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useState } from 'react';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          fontSizes: {
            xs: '0.6rem',
            sm: '0.75rem',
            md: '0.9rem',
            lg: '1rem',
            xl: '1.2rem',
          },
          components: {
            Button: {
              // Subscribe to theme and component params
              styles: (_theme, _params: ButtonStylesParams, { variant }) => ({
                root: {
                  '&:hover': {
                    backgroundColor: variant === 'subtle' ? 'rgba(135, 131, 131, 0.1)' : undefined,
                  },
                },
              }),
            },
          },
          globalStyles: () => ({
            '.mantine-1tea8o2': {
              minHeight: 'calc(100vh - 90px)',
            },
            body: {
              '::-webkit-scrollbar': {
                width: '0',
              },
            },
          }),
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/sing" element={<Sing />} />
            <Route path="/graphi" element={<Graphi />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default withTranslation()(App);
