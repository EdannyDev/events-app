import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const Layout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si la ruta actual es login o register
    if (router.pathname === '/login' || router.pathname === '/register') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [router.pathname]);

  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;