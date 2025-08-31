import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/layout';
import styled from '@emotion/styled';
import {
    EditarEventoForm,
    FormTitle,
    FormInput,
    FormSelect,
    FormButton
} from '../frontend/styles/editEvents.styles';

const MapClient = dynamic(() => import('../frontend/components/mapclient'), { ssr: false });

const PageContainer = styled.div`
    padding-top: 70px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
`;

const EditarEvento = ({ eventoId }) => {
    const [evento, setEvento] = useState({
        nombre: '', fecha: '', hora: '', descripcion: '',
        invitados: '', costo: '', ubicacion: { coordinates: ['', ''] }, estado: ''
    });
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!eventoId) return;
        const fetchEvento = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/eventos/${eventoId}`);
                const e = resp.data;
                setEvento({
                    nombre: e.nombre || '',
                    fecha: new Date(e.fecha).toISOString().slice(0, 10),
                    hora: e.hora || '',
                    descripcion: e.descripcion || '',
                    invitados: (e.invitados || []).join(', '),
                    costo: e.costo ? e.costo.toString() : '',
                    ubicacion: e.ubicacion || { coordinates: ['', ''] },
                    estado: e.estado || ''
                });
                if (e.ubicacion?.coordinates[1] && e.ubicacion?.coordinates[0]) {
                    setLatitud(e.ubicacion.coordinates[1]);
                    setLongitud(e.ubicacion.coordinates[0]);
                }
            } catch (err) {
                
            }
        };
        fetchEvento();
    }, [eventoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/eventos/${eventoId}`, {
                ...evento,
                ubicacion: { type: 'Point', coordinates: [parseFloat(longitud), parseFloat(latitud)] }
            });
            alert('Evento actualizado correctamente');
            router.push('/table');
        } catch (err) {
            alert('Error al actualizar evento');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };

    return (
        <Layout>
            <PageContainer>
                <EditarEventoForm onSubmit={handleSubmit}>
                    <FormTitle>Editar Evento</FormTitle>
                    <FormInput type="text" name="nombre" placeholder="Nombre del evento" value={evento.nombre} onChange={handleChange} required />
                    <FormInput type="date" name="fecha" value={evento.fecha} onChange={handleChange} required />
                    <FormInput type="time" name="hora" value={evento.hora} onChange={handleChange} required />
                    <FormInput as="textarea" name="descripcion" value={evento.descripcion} onChange={handleChange} required />
                    <FormInput type="text" name="invitados" value={evento.invitados} onChange={handleChange} />
                    <FormInput type="number" name="costo" value={evento.costo} onChange={handleChange} required />
                    <FormSelect name="estado" value={evento.estado} onChange={handleChange}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="concluido">Concluido</option>
                    </FormSelect>
                    {latitud !== null && longitud !== null ? (
                        <MapClient
                            latitud={latitud}
                            longitud={longitud}
                            setLatitud={setLatitud}
                            setLongitud={setLongitud}
                            style={{ height: '400px', width: '100%' }}
                        />
                    ) : (
                        <div>Cargando mapa...</div>
                    )}
                    <div style={{ marginTop: '20px' }}></div>
                    <FormInput type="text" placeholder="Latitud" value={latitud || ''} readOnly />
                    <FormInput type="text" placeholder="Longitud" value={longitud || ''} readOnly />
                    <FormButton type="submit">Guardar Cambios</FormButton>
                </EditarEventoForm>
            </PageContainer>
        </Layout>
    );
};

export default EditarEvento;