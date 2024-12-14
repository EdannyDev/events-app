import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Layout from '@/frontend/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {
  CenteredContainer,
  CalendarWrapper,
  CalendarTitle,
  EventDetail
} from '../frontend/styles/calendar.styles';

const localizer = momentLocalizer(moment);

const CalendarioPage = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/eventos');
      const eventosFiltrados = response.data.map(evento => ({
        ...evento,
        start: new Date(evento.fecha),
        end: moment(evento.fecha).add(1, 'hours').toDate(),
      }));
      setEventos(eventosFiltrados);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleSelectEvent = (evento) => {
    console.log('Evento seleccionado:', evento);
    setEventoSeleccionado(evento);
  };

  return (
    <Layout>
      <CenteredContainer>
        <CalendarWrapper>
          <CalendarTitle><FontAwesomeIcon icon={faCalendarAlt} /> Calendario de Eventos</CalendarTitle>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, color: "black" }}
            onSelectEvent={handleSelectEvent}
          />
          {eventoSeleccionado && (
            <EventDetail style={{ color: "black" }}>
              <h3>Detalles del Evento</h3>
              <p><strong>Nombre:</strong> {eventoSeleccionado.nombre}</p>
              <p><strong>Fecha:</strong> {moment(eventoSeleccionado.fecha).format('LL')}</p>
              <p><strong>Hora:</strong> {eventoSeleccionado.hora}</p>
              <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
            </EventDetail>
          )}
        </CalendarWrapper>
      </CenteredContainer>
    </Layout>
  );
};

export default CalendarioPage;
