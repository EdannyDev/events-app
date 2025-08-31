🚀Sistema Gestor de Eventos – Frontend y Backend

📌Descripción
Este proyecto es un sistema gestor de eventos que permite a los usuarios:
-Crear, editar y eliminar sus propios eventos.
-Visualizar los eventos en un calendario interactivo.
-Consultar la ubicación de los eventos en un mapa (Leaflet).
-Ver detalles de cada evento.
-Registrar a otros usuarios en los eventos creados.

El sistema está diseñado para gestionar actividades de manera dinámica y visual, integrando calendario, mapas y autenticación de usuarios.

🛠️Tecnologías utilizadas
-Frontend: Next.js, React, Emotion Styled, FontAwesome, FullCalendar, React Big Calendar, React-Leaflet, Axios
-Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, dotenv, cors

⚙️Instalación y ejecución

1.-Clonar el repositorio:
git clone https://github.com/EdannyDev/events-app.git

2.-Instalar dependencias:
npm install

3.-Configurar variables de entorno en un archivo .env en la raíz del proyecto:
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventsDB
JWT_SECRET=tu_secreto_jwt

4.-Ejecutar la aplicación en modo desarrollo:
node server.js para el backend y yarn dev para el frontend

5.-Abrir en el navegador:
http://localhost:3000 mientras el backend corre en http://localhost:5000

✨Características principales
-Calendario interactivo para ver todos los eventos creados.
-Mapa con Leaflet para ubicar visualmente los eventos.
-Gestión de eventos: Crear, editar y eliminar eventos propios.
-Registro de usuarios en eventos para asistencia y control.
-Autenticación: Login y registro con JWT y bcryptjs.
-Interfaz moderna y responsiva con Next.js, React y Emotion Styled.
-Seguridad: Solo los usuarios dueños de un evento pueden modificarlo o eliminarlo.