import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Boton, GestionWrapper, Tabla, ModalOverlay, ModalContent, ModalHeader, ModalIcon, ModalBody, ModalFooter, ConfirmButton, CancelButton, FiltroWrapper, FiltroInputWrapper, FiltroInput, FiltroIcon, PaginacionWrapper, SelectPaginacion } from '../frontend/styles/table.styles';
import Layout from '@/frontend/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExclamationTriangle, faCheck, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const TablePage = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [eventosPorPagina, setEventosPorPagina] = useState(5); // Cantidad de eventos por página
    const router = useRouter();

    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/api/eventos');
                setEventos(respuesta.data);
            } catch (error) {
                console.error('Error al obtener eventos:', error);
            }
        };
        obtenerEventos();
    }, []);

    const eliminarEvento = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/eventos/${id}`);
            setEventos(eventos.filter(evento => evento._id !== id));
            setEventoAEliminar(null);
        } catch (error) {
            console.error('Error al eliminar evento:', error);
        }
    };

    const editarEvento = (id) => {
        router.push(`/eventos/editar/${id}`);
    };

    const mostrarModalEliminar = (id) => {
        setEventoAEliminar(id);
    };

    const ocultarModalEliminar = () => {
        setEventoAEliminar(null);
    };

    const filtrarEventos = () => {
        return eventos.filter(evento =>
            evento.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            evento.fecha.toLowerCase().includes(filtro.toLowerCase()) ||
            evento.hora.toLowerCase().includes(filtro.toLowerCase()) ||
            evento.estado.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    // Paginación
    const indiceUltimoEvento = paginaActual * eventosPorPagina;
    const indicePrimerEvento = indiceUltimoEvento - eventosPorPagina;
    const eventosActuales = filtrarEventos().slice(indicePrimerEvento, indiceUltimoEvento);

    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    const handleEventosPorPaginaChange = (e) => {
        setEventosPorPagina(Number(e.target.value));
        setPaginaActual(1); // Volver a la primera página al cambiar la cantidad de eventos por página
    };

    return (
        <Layout>
            <GestionWrapper>
                <h1>Gestión de Eventos</h1>
                <FiltroWrapper>
                    <FiltroInputWrapper>
                        <FiltroIcon>
                            <FontAwesomeIcon icon={faSearch} />
                        </FiltroIcon>
                        <FiltroInput
                            type="text"
                            placeholder="Buscar evento..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </FiltroInputWrapper>
                    <SelectPaginacion onChange={handleEventosPorPaginaChange} value={eventosPorPagina}>
                        <option value={5}>Mostrar 5</option>
                        <option value={10}>Mostrar 10</option>
                        <option value={20}>Mostrar 20</option>
                    </SelectPaginacion>
                </FiltroWrapper>
                <Tabla>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosActuales.map(evento => (
                            <tr key={evento._id}>
                                <td>{evento.nombre}</td>
                                <td>{new Date(evento.fecha).toLocaleDateString()}</td>
                                <td>{evento.hora}</td>
                                <td>{evento.estado}</td>
                                <td>
                                    <Boton amarillo onClick={() => editarEvento(evento._id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Boton>
                                    <Boton rojo onClick={() => mostrarModalEliminar(evento._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Boton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Tabla>
                <PaginacionWrapper>
                    {Array.from({ length: Math.ceil(filtrarEventos().length / eventosPorPagina) }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => cambiarPagina(i + 1)}
                            style={{ background: i + 1 === paginaActual ? '#007bff' : '#ccc' }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </PaginacionWrapper>
            </GestionWrapper>

            {eventoAEliminar && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Confirmar Eliminación</ModalHeader>
                        <ModalIcon>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </ModalIcon>
                        <ModalBody>
                            ¿Estás seguro de que deseas eliminar este evento?
                        </ModalBody>
                        <ModalFooter>
                            <ConfirmButton onClick={() => eliminarEvento(eventoAEliminar)}>
                                <FontAwesomeIcon icon={faCheck} />
                                Confirmar
                            </ConfirmButton>
                            <CancelButton onClick={ocultarModalEliminar}>
                                <FontAwesomeIcon icon={faTimes} />
                                Cancelar
                            </CancelButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Layout>
    );
};

export default TablePage;