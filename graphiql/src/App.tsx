import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import SignIn from './Pages/SignIn';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/graphi" element={<Graphi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
