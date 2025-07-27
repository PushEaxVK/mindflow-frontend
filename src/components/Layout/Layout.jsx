import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ModalMenu from '../ModalMenu/ModalMenu.jsx';

const Layout = () => {
  return (
    <>
      <AppBar />
      <ModalMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
