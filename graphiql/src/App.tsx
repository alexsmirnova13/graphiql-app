import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import SignIn from './Pages/SignIn';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import { useAppSelector } from './store/hooks';

const App = () => {
  const currentUser = useAppSelector((state) => state.user);
  const ReguireAuth = ({ children }: { children: React.ReactElement }) => {
    return currentUser ? children : <Navigate to="/signin" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/graphi"
        element={
          <ReguireAuth>
            <Graphi />
          </ReguireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
