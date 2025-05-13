import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './utils/ScrollToTop';

import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Message from './pages/Message';
import Post from './pages/Post';
import Register from './pages/Register';

import ProfileExchanges from './components/tabs/ProfileExchanges';
import ProfileMain from './components/tabs/ProfileMain';
import ProfileOffers from './components/tabs/ProfileOffers';
import ProfilePosts from './components/tabs/ProfilePosts';
import Profile from './pages/Profile'; // layout avec les onglets

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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="message/:userId?" element={<Message />} />
          <Route path="post" element={<Post />} />

          <Route path="profile/:user" element={<Profile />}>
            <Route index element={<ProfileMain />} />
            {/* <Route path="profile" element={<ProfileMain />} /> */}
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="offers" element={<ProfileOffers />} />
            <Route path="exchanges" element={<ProfileExchanges />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <Footer />
    </AuthProvider>
  );
}

export default App;
