import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Sing from './Pages/Sign';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/404.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/sing" element={<Sing />} />
      <Route path="/graphi" element={<Graphi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
