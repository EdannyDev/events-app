import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { DetalleWrapper, Mapa, BotonRegresar } from '../../frontend/styles/details.styles';

const libraries = ["places"];

const DetalleEvento = () => {
  const router = useRouter();
  const { id } = router.query;
  const [evento, setEvento] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-uMy02O6IY8vmhH9cViaPoRhk9icy0Ds", // Reemplaza con tu API key
    libraries,
  });

  useEffect(() => {
    const obtenerEvento = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/eventos/${id}`);
        setEvento(respuesta.data);
      } catch (error) {
        console.error('Error al obtener el evento:', error);
        setError('Error al cargar el evento');
      } finally {
        setIsLoading(false);
      }
    };

    const obtenerUsuariosRegistrados = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/eventos/${id}/registrados`);
        setUsuariosRegistrados(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los usuarios registrados:', error);
        setError('Error al cargar los usuarios registrados');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      obtenerEvento();
      obtenerUsuariosRegistrados();
    }
  }, [id]);

  if (isLoading) return <div>Cargando...</div>;
  if (loadError) return <div>Error al cargar el mapa</div>;
  if (error) return <div>{error}</div>;
  if (!evento) return <div>Cargando...</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  const { nombre, fecha, hora, descripcion, invitados, costo, estado, ubicacion } = evento;

  return (
    <>
      <DetalleWrapper>
        <h1>{nombre}</h1>
        <p>{new Date(fecha).toLocaleDateString()} - {hora}</p>
        <p>{descripcion}</p>
        <p>Invitados: {invitados.join(', ')}</p>
        <p>Costo: {costo === 0 ? 'Gratuito' : `$${costo}`}</p>
        <p>Estado: {estado}</p>
        <p>Ubicación: {ubicacion.coordinates.join(', ')}</p>
        <p>Usuarios Registrados: {usuariosRegistrados.length}</p>
        <h3>Lista de Usuarios Registrados:</h3>
        <ul>
          {usuariosRegistrados.map(usuario => (
            <li key={usuario._id}>{usuario.nombre}</li>
          ))}
        </ul>
        <Mapa>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={15}
            center={{
              lat: parseFloat(ubicacion.coordinates[1]),
              lng: parseFloat(ubicacion.coordinates[0])
            }}
          >
            <Marker 
              position={{
                lat: parseFloat(ubicacion.coordinates[1]),
                lng: parseFloat(ubicacion.coordinates[0])
              }}
            />
          </GoogleMap>
        </Mapa>
      </DetalleWrapper>
      <BotonRegresar onClick={() => router.push('/home')}>
        <FontAwesomeIcon icon={faHome} /> Regresar a Inicio
      </BotonRegresar>
    </>
  );
};

export default DetalleEvento;