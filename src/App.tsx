import { Routes, Route } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './utils/ScrollToTop';

import Homepage from './pages/Homepage';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import Message from './pages/Message';
import Post from './pages/Post';

import Profile from './pages/Profile'; // layout avec les onglets
import ProfileMain from './components/tabs/ProfileMain';
import ProfilePosts from './components/tabs/ProfilePosts';
import ProfileOffers from './components/tabs/ProfileOffers';
import ProfileExchanges from './components/tabs/ProfileExchanges';

function App() {
  return (
    <AuthProvider>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="explore" element={<Explore />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="message/:userId?" element={<Message />} />
        <Route path="post" element={<Post />} />

        <Route path="profile/:user" element={<Profile />}>
          <Route index element={<ProfileMain />} />
          <Route path="profile" element={<ProfileMain />} />
          <Route path="posts" element={<ProfilePosts />} />
          <Route path="offers" element={<ProfileOffers />} />
          <Route path="exchanges" element={<ProfileExchanges />} />
        </Route>
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
