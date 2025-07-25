import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <AppBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
