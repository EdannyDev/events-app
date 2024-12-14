import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Layout from '@/frontend/components/layout';
import {
  EditarEventoForm,
  FormTitle,
  FormInput,
  FormSelect,
  FormButton
} from '../frontend/styles/editEvents.styles'; // Ajustar la ruta según la ubicación de los estilos

const libraries = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const EditarEvento = ({ eventoId }) => {
  const [evento, setEvento] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    descripcion: '',
    invitados: '',
    costo: '',
    ubicacion: { type: 'Point', coordinates: ['', ''] },
    estado: ''
  });
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const router = useRouter();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-uMy02O6IY8vmhH9cViaPoRhk9icy0Ds",
    libraries,
    loading: 'async'
  });

  useEffect(() => {
    const obtenerEvento = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/eventos/${eventoId}`);
        if (respuesta.data) {
          const { nombre, fecha, hora, descripcion, invitados, costo, ubicacion, estado } = respuesta.data;
          setEvento({
            nombre: nombre || '',
            fecha: new Date(fecha).toISOString().slice(0, 10),
            hora: hora || '',
            descripcion: descripcion || '',
            invitados: (invitados || []).join(', '),
            costo: costo ? costo.toString() : '',
            ubicacion: {
              type: ubicacion.type || 'Point',
              coordinates: ubicacion.coordinates || ['', ''],
            },
            estado: estado || ''
          });
          setLatitud(ubicacion.coordinates[1] || '');
          setLongitud(ubicacion.coordinates[0] || '');
        }
      } catch (error) {
        console.error('Error al obtener evento:', error);
      }
    };

    if (eventoId) {
      obtenerEvento();
    }
  }, [eventoId]);

  const handleMapClick = useCallback((event) => {
    setLatitud(event.latLng.lat());
    setLongitud(event.latLng.lng());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/eventos/${eventoId}`, {
        ...evento,
        ubicacion: {
          type: 'Point',
          coordinates: [parseFloat(longitud), parseFloat(latitud)]
        }
      });
      alert('Evento actualizado correctamente');
      router.push('/table');
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      alert('Error al actualizar evento');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  if (loadError) return "Error al cargar el mapa";
  if (!isLoaded) return "Cargando mapa...";

  return (
    <Layout>
      <EditarEventoForm onSubmit={handleSubmit}>
        <FormTitle>Editar Evento</FormTitle>
        <FormInput type="text" name="nombre" placeholder="Nombre del evento" value={evento.nombre} onChange={handleChange} required />
        <FormInput type="date" name="fecha" placeholder="Fecha del evento" value={evento.fecha} onChange={handleChange} required />
        <FormInput type="time" name="hora" placeholder="Hora del evento" value={evento.hora} onChange={handleChange} required />
        <FormInput as="textarea" name="descripcion" placeholder="Descripción del evento" value={evento.descripcion} onChange={handleChange} required />
        <FormInput type="text" name="invitados" placeholder="Invitados" value={evento.invitados} onChange={handleChange} />
        <FormInput type="number" name="costo" placeholder="Costo del evento" value={evento.costo} onChange={handleChange} required />
        
        <FormSelect name="estado" value={evento.estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="cancelado">Cancelado</option>
          <option value="concluido">Concluido</option>
        </FormSelect>
        
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={latitud && longitud ? { lat: parseFloat(latitud), lng: parseFloat(longitud) } : { lat: 19.432608, lng: -99.133209 }}
          onClick={handleMapClick}
        >
          {latitud && longitud && <Marker position={{ lat: parseFloat(latitud), lng: parseFloat(longitud) }} />}
        </GoogleMap>
        <br></br>
        <FormInput type="text" placeholder="Latitud" value={latitud || ''} readOnly />
        <FormInput type="text" placeholder="Longitud" value={longitud || ''} readOnly />
        <FormButton type="submit">Guardar Cambios</FormButton>
      </EditarEventoForm>
    </Layout>
  );
};

export default EditarEvento;