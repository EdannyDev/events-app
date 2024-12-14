import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { EventoCard, EventosLista, PaginaWrapper } from '../frontend/styles/home.styles';
import Layout from '@/frontend/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [eventos, setEventos] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para almacenar userId

  // Definir la función obtenerEventos fuera del useEffect
  const obtenerEventos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/api/eventos');
      // Filtrar eventos activos y futuros
      const eventosFiltrados = respuesta.data.filter(evento => (
        evento.estado === 'activo' && new Date(evento.fecha) >= new Date()
      ));
      setEventos(eventosFiltrados);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    }
  };

  useEffect(() => {
    // Obtener userId desde localStorage al cargar la página
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);

    // Llamar a obtenerEventos en el useEffect
    obtenerEventos();
  }, []);

  const registrarUsuarioEnEvento = async (eventoId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/eventos/${eventoId}/registrados`,
        { userId }
      );

      console.log(response.data); // Muestra la respuesta del servidor en consola
      alert('Usuario registrado correctamente en el evento');
      // Actualizar la lista de eventos después de registrar al usuario
      obtenerEventos(); // Llamar nuevamente para refrescar la lista de eventos
    } catch (error) {
      if (error.response) {
        console.error('Error al registrar usuario en evento:', error.response.data.mensaje);
        alert(error.response.data.mensaje); // Muestra el mensaje de error al usuario
      } else if (error.request) {
        console.error('No se pudo conectar con el servidor:', error.request);
        alert('Error al conectar con el servidor');
      } else {
        console.error('Error en la solicitud:', error.message);
        alert('Error en la solicitud');
      }
    }
  };

  return (
    <Layout>
      <PaginaWrapper>
        <h1><FontAwesomeIcon icon={faCalendarAlt} /> Próximos Eventos</h1>
        <EventosLista>
          {eventos.map(evento => (
            <EventoCard key={evento._id}>
              <h2>{evento.nombre}</h2>
              <p>{new Date(evento.fecha).toLocaleDateString()} - {evento.hora}</p>
              <p>{evento.descripcion}</p>
              <Link href={`/eventos/${evento._id}`}>
                Ver detalles
              </Link>
              <button style={{ color: "black", marginLeft: "110px" }} onClick={() => registrarUsuarioEnEvento(evento._id)}>
                Registrar
              </button>
            </EventoCard>
          ))}
        </EventosLista>
      </PaginaWrapper>
    </Layout>
  );
};

export default HomePage;