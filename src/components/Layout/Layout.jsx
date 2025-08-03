import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ModalMenu from '../ModalMenu/ModalMenu';
import { useSelector } from 'react-redux';
import {
  selectModalIsOpen,
  selectModalType,
} from '../../redux/modal/selectors.js';
import Modal from '../Modal/Modal.jsx';
import Footer from '../Footer/Footer';

const Layout = () => {
  const isOpen = useSelector(selectModalIsOpen);
  const type = useSelector(selectModalType);
  return (
    <>
      <AppBar />
      {isOpen && type === 'mobileMenu' && <ModalMenu />}
      <Modal />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
