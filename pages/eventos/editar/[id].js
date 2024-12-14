import EditarEvento from '../../editEvents';

const EditarEventoPage = ({ eventoId }) => {
    return <EditarEvento eventoId={eventoId} />;
};

export default EditarEventoPage;

// Esta función se ejecuta en el servidor y puede cargar datos para la página
export async function getServerSideProps(context) {
    const { params } = context;
    const eventoId = params.id; // Obtener el id dinámico desde la URL

    return {
        props: {
            eventoId
        }
    };
}