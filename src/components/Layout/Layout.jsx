import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <AppBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
