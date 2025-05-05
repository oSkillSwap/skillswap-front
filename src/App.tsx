import { Route, Routes } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="explore" element={<Explore />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
