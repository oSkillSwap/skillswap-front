import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './utils/ScrollToTop';

import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ProfileExchanges from './components/tabs/ProfileExchanges';
import ProfilePage from './components/tabs/ProfileMain';
import ProfileOffers from './components/tabs/ProfileOffers';
import ProfilePosts from './components/tabs/ProfilePosts';
import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Message from './pages/Message';
import Post from './pages/Post';
import ProfileLayout from './pages/Profile';
import Register from './pages/Register';

import AdminIndex from './components/admin/AdminIndex';
import AdminCategoriesIndex from './components/admin/adminCategories/AdminCategoriesIndex';
import AdminPostIndex from './components/admin/adminPost/AdminPostIndex';
import AdminUserIndex from './components/admin/adminUser/AdminUserIndex';
import About from './pages/static/About';
import ErrorPage404 from './pages/static/ErrorPage404';
import Legals from './pages/static/Legals';
import PrivacyPolicy from './pages/static/PrivacyPolicy';
import Terms from './pages/static/Terms';

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

          <Route path="forgot-password" element={<ForgotPasswordForm />} />
          <Route path="reset-password/:token" element={<ResetPasswordForm />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path=":userId" element={<ProfilePage />} />
            <Route path=":userId/posts" element={<ProfilePosts />} />
            <Route path=":userId/offers" element={<ProfileOffers />} />
            <Route path=":userId/exchanges" element={<ProfileExchanges />} />
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="offers" element={<ProfileOffers />} />
            <Route path="exchanges" element={<ProfileExchanges />} />

            <Route path="admin">
              <Route index element={<AdminIndex />} />
              <Route path="users" element={<AdminUserIndex />} />
              <Route path="posts" element={<AdminPostIndex />} />
              <Route path="categories" element={<AdminCategoriesIndex />} />
            </Route>
          </Route>

          <Route path="about" element={<About />} />
          <Route path="legals" element={<Legals />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<ErrorPage404 />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </AuthProvider>
  );
}

export default App;
