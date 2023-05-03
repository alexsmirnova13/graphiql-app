import { Route, Routes } from 'react-router-dom';
import Welcom from './Pages/Welcom';
import Sing from './Pages/Sign';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcom />} />
      <Route path="/sing" element={<Sing />} />
      <Route path="/graphi" element={<Graphi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
