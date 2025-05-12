import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Message from './pages/Message';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Homepage />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<Profile />} />
            <Route path=":user" element={<Profile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="message/:userId?" element={<Message />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </AuthProvider>
  );
}

export default App;
