// navbar.styles.js

import styled from '@emotion/styled';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
  height: 60px; /* Altura ajustable según tu diseño */
  position: fixed; /* Hace que el navbar sea fijo */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
`;

export const AppName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center; /* Centra las pestañas */
  flex-grow: 1; /* Para que las pestañas ocupen todo el espacio restante */
`;

export const Tab = styled.div`
  margin: 0 10px; /* Espacio entre cada pestaña */
  cursor: pointer;
  color: ${props => props.active ? '#ffc107' : '#fff'}; /* Color activo e inactivo */
`;

export const CerrarSesion = styled.div`
  cursor: pointer;
  margin-left: auto; /* Empuja el CerrarSesion al extremo derecho */
  display: flex;
  align-items: center;
`;