import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/layout';
import styled from '@emotion/styled';
import { CrearEventoForm, FormTitle, FormInput, FormButton } from '../frontend/styles/addEvents.styles';

const MapClient = dynamic(() => import('../frontend/components/mapclient'), { ssr: false });

const PageContainer = styled.div`
    padding-top: 70px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
`;

const CrearEvento = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [invitados, setInvitados] = useState('');
    const [costo, setCosto] = useState('');
    const [latitud, setLatitud] = useState(19.432608);
    const [longitud, setLongitud] = useState(-99.133209);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/eventos', {
                nombre,
                fecha,
                hora,
                descripcion,
                invitados: invitados.split(',').map(i => i.trim()),
                costo,
                ubicacion: { type: 'Point', coordinates: [longitud, latitud] },
            });
            alert('Evento creado correctamente');
            router.push('/home');
        } catch (error) {
            alert('Error al crear evento');
        }
    };

    return (
        <Layout>
            <PageContainer>
                <CrearEventoForm onSubmit={handleSubmit}>
                    <FormTitle>Registrar Nuevo Evento</FormTitle>
                    <FormInput type="text" placeholder="Nombre del evento" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    <FormInput type="date" placeholder="Fecha del evento" value={fecha} onChange={e => setFecha(e.target.value)} required />
                    <FormInput type="time" placeholder="Hora del evento" value={hora} onChange={e => setHora(e.target.value)} required />
                    <FormInput as="textarea" placeholder="Descripción del evento" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
                    <FormInput type="text" placeholder="Invitados" value={invitados} onChange={e => setInvitados(e.target.value)} />
                    <FormInput type="number" placeholder="Costo del evento" value={costo} onChange={e => setCosto(e.target.value)} required />
                    
                    <MapClient
                        latitud={latitud}
                        longitud={longitud}
                        setLatitud={setLatitud}
                        setLongitud={setLongitud}
                        style={{ height: '400px', width: '100%' }}
                    />
                    
                    <div style={{ marginTop: '20px' }}></div>

                    <FormInput type="text" placeholder="Latitud" value={latitud} readOnly />
                    <FormInput type="text" placeholder="Longitud" value={longitud} readOnly />
                    <FormButton type="submit">Crear Evento</FormButton>
                </CrearEventoForm>
            </PageContainer>
        </Layout>
    );
};

export default CrearEvento;