import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHome, faListAlt, faCalendarPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Tabs, Tab, CerrarSesion, AppName } from '../styles/navbar.styles';

const Navbar = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home'); // Estado para gestionar la pestaña activa

  useEffect(() => {
    // Obtener la ruta actual y establecer el estado activo
    const path = router.pathname;
    if (path === '/home') {
      setActiveTab('home');
    } else if (path === '/table') {
      setActiveTab('table');
    } else if (path === '/addEvents') {
      setActiveTab('addEvents');
    } else if (path === '/calendar') {
      setActiveTab('calendar'); 
    }
  }, [router.pathname]);

  const cerrarSesion = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    localStorage.removeItem('userId'); // Eliminar el userId del localStorage
    console.log('Sesión cerrada. userId eliminado del localStorage:', localStorage.getItem('userId')); // Verificar que userId se haya eliminado
    window.location.href = '/login'; // Redirigir al usuario al login
  };  

  return (
    <Nav>
      <AppName>
        <FontAwesomeIcon icon={faCalendarAlt} />&nbsp; |&nbsp;EventSphere
      </AppName>
      <Tabs>
        <Tab active={activeTab === 'home'}>
          <Link href="/home" passHref>
            <div onClick={() => setActiveTab('home')}>
              <FontAwesomeIcon icon={faHome} /> Inicio
            </div>
          </Link>
        </Tab>
        <Tab active={activeTab === 'table'}>
          <Link href="/table" passHref>
            <div onClick={() => setActiveTab('table')}>
              <FontAwesomeIcon icon={faListAlt} /> Eventos Registrados
            </div>
          </Link>
        </Tab>
        <Tab active={activeTab === 'addEvents'}>
          <Link href="/addEvents" passHref>
            <div onClick={() => setActiveTab('addEvents')}>
              <FontAwesomeIcon icon={faCalendarPlus} /> Agregar Evento
            </div>
          </Link>
        </Tab>
        <Tab active={activeTab === 'calendar'}>
          <Link href="/calendar" passHref>
            <div onClick={() => setActiveTab('calendar')}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Calendario
            </div>
          </Link>
        </Tab>
      </Tabs>
      <CerrarSesion onClick={cerrarSesion}>
        <FontAwesomeIcon icon={faSignOutAlt} />&nbsp;Cerrar Sesión
      </CerrarSesion>
    </Nav>
  );
};

export default Navbar;