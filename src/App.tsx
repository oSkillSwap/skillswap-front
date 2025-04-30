import { Route, Routes } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './hooks/ScrollToTop';
import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="explore" element={<Explore />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
