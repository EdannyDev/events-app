import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { DetalleWrapper, Mapa, BotonRegresar } from '../../frontend/styles/details.styles';

const MapClient = dynamic(() => import('@/frontend/components/mapclient'), { ssr: false });

const DetalleEvento = () => {
    const router = useRouter();
    const { id } = router.query;
    const [evento, setEvento] = useState(null);
    const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchEvento = async () => {
            try {
                const respEvento = await axios.get(`http://localhost:5000/api/eventos/${id}`);
                setEvento(respEvento.data);
                const respUsuarios = await axios.get(`http://localhost:5000/api/eventos/${id}/registrados`);
                setUsuariosRegistrados(respUsuarios.data);
            } catch (err) {
                setError('Error al cargar los datos del evento');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvento();
    }, [id]);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!evento) return <div>No se encontró el evento</div>;

    const { nombre, fecha, hora, descripcion, invitados, costo, estado, ubicacion } = evento;
    const coordsValidas = ubicacion?.coordinates?.length === 2;
    const latitud = coordsValidas ? ubicacion.coordinates[1] : null;
    const longitud = coordsValidas ? ubicacion.coordinates[0] : null;

    return (
        <>
            <DetalleWrapper>
                <h1>{nombre}</h1>
                <p>{new Date(fecha).toLocaleDateString()} - {hora}</p>
                <p>{descripcion}</p>
                <p>Invitados: {invitados.join(', ')}</p>
                <p>Costo: {costo === 0 ? 'Gratuito' : `$${costo}`}</p>
                <p>Estado: {estado}</p>
                <p>Ubicación: {coordsValidas ? ubicacion.coordinates.join(', ') : 'No disponible'}</p>
                <p>Usuarios Registrados: {usuariosRegistrados.length}</p>
                <h3>Lista de Usuarios Registrados:</h3>
                <ul>
                    {usuariosRegistrados.map(u => <li key={u._id}>{u.nombre}</li>)}
                </ul>

                <Mapa>
                    {coordsValidas ? (
                        <MapClient
                            latitud={latitud}
                            longitud={longitud}
                            setLatitud={() => {}}
                            setLongitud={() => {}}
                            style={{ height: '100%', width: '100%' }}
                        />
                    ) : (
                        <div>Mapa no disponible.</div>
                    )}
                </Mapa>
            </DetalleWrapper>
            <BotonRegresar onClick={() => router.push('/home')}>
                <FontAwesomeIcon icon={faHome} /> Regresar a Inicio
            </BotonRegresar>
        </>
    );
};

export default DetalleEvento;