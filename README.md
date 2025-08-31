# 🚀Sistema Gestor de Eventos – Frontend y Backend  

## 📌Descripción  
Este proyecto es un **sistema gestor de eventos** que permite a los usuarios:  
- Crear, editar y eliminar sus propios eventos.  
- Visualizar los eventos en un **calendario interactivo**.  
- Consultar la **ubicación de los eventos en un mapa** con Leaflet.  
- Ver detalles completos de cada evento.  
- Registrar a otros usuarios en los eventos creados.  

El sistema está diseñado para **gestionar actividades de manera dinámica y visual**, integrando calendario, mapas interactivos y autenticación de usuarios.  

## 🛠️Tecnologías utilizadas
### Frontend  
- **Next.js**  
- **React**  
- **Emotion Styled** (estilos)  
- **FontAwesome** (íconos)  
- **FullCalendar / React Big Calendar** (calendarios interactivos)  
- **React-Leaflet** (mapas interactivos)  
- **Axios** (consumo de APIs)  

### Backend  
- **Node.js**  
- **Express** (Framework para APIs REST)  
- **MongoDB / Mongoose** (Base de datos NoSQL y modelado de datos)  
- **JWT** (autenticación y autorización)  
- **bcryptjs** (encriptación de contraseñas)  
- **dotenv** (variables de entorno)  
- **CORS** (seguridad en solicitudes cross-origin)

## ⚙️Instalación y ejecución  

```bash
# 1. Clonar el repositorio
git clone https://github.com/EdannyDev/events-app.git

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno en .env

PORT=5000
MONGO_URI=mongodb://localhost:27017/eventsDB
JWT_SECRET=tu_secreto_jwt

# 4. Ejecutar la aplicación
En una terminal, iniciar el backend
node server.js

# 5. En otra terminal, iniciar el frontend
yarn dev

# 6. El sistema estará disponible en el navegador:
http://localhost:3000

# 7. El backend estará funcionando en:
http://localhost:5000

```

## 🗂️Endpoints principales
- Eventos: `/api/eventos`
- Usuarios: `/api/usuarios`

## ✨Características principales
- Calendario interactivo para ver todos los eventos creados.
- Mapa con Leaflet para ubicar los eventos de forma visual.
- Gestión de eventos: crear, editar y eliminar eventos propios.
- Registro de usuarios en eventos para asistencia y control.
- Autenticación con JWT y bcryptjs (login y registro de usuarios).
- Interfaz moderna y responsiva con Next.js + React.
- Seguridad: solo los creadores pueden modificar o eliminar sus eventos.
