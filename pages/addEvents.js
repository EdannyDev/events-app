import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Layout from '@/frontend/components/layout';
import { CrearEventoForm, FormTitle, FormInput, FormButton } from '../frontend/styles/addEvents.styles';

const libraries = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 19.432608,
  lng: -99.133209
};

const CrearEvento = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [invitados, setInvitados] = useState('');
  const [costo, setCosto] = useState('');
  const [latitud, setLatitud] = useState(center.lat);
  const [longitud, setLongitud] = useState(center.lng);
  const router = useRouter();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-uMy02O6IY8vmhH9cViaPoRhk9icy0Ds", // Reemplaza con tu API key
    libraries,
    loading: 'async'
  });

  const handleMapClick = useCallback((event) => {
    setLatitud(event.latLng.lat());
    setLongitud(event.latLng.lng());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/eventos', {
        nombre,
        fecha,
        hora,
        descripcion,
        invitados: invitados.split(',').map(inv => inv.trim()), // Separar invitados por coma y limpiar
        costo,
        ubicacion: {
          type: 'Point',
          coordinates: [parseFloat(longitud), parseFloat(latitud)]
        }
      });
      alert('Evento creado correctamente');
      router.push('/home'); // Redireccionar a la página principal después de crear el evento
    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Error al crear evento');
    }
  };

  if (loadError) return "Error al cargar el mapa";
  if (!isLoaded) return "Cargando mapa...";

  return (
    <Layout>
      <CrearEventoForm onSubmit={handleSubmit}>
        <FormTitle>Registrar Nuevo Evento</FormTitle>
        <FormInput type="text" placeholder="Nombre del evento" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <FormInput type="date" placeholder="Fecha del evento" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <FormInput type="time" placeholder="Hora del evento" value={hora} onChange={(e) => setHora(e.target.value)} required />
        <FormInput as="textarea" placeholder="Descripción del evento" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <FormInput type="text" placeholder="Invitados" value={invitados} onChange={(e) => setInvitados(e.target.value)} />
        <FormInput type="number" placeholder="Costo del evento" value={costo} onChange={(e) => setCosto(e.target.value)} required />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onClick={handleMapClick}
        >
          <Marker position={{ lat: latitud, lng: longitud }} />
        </GoogleMap>
        <br></br>
        <FormInput type="text" placeholder="Latitud" value={latitud} readOnly />
        <FormInput type="text" placeholder="Longitud" value={longitud} readOnly />
        <FormButton type="submit">Crear Evento</FormButton>
      </CrearEventoForm>
    </Layout>
  );
};

export default CrearEvento;