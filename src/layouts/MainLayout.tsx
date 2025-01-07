import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="py-2 px-5">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
