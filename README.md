# 🚀Tienda en línea de videojuegos – Frontend y Backend  

## 📌Descripción  
Este proyecto es una **tienda en línea de videojuegos**, que incluye un carrito de compras y un panel administrativo integrado.  

**Usuarios normales pueden:**  
- Explorar el catálogo de videojuegos.  
- Agregar productos al carrito y realizar compras seguras mediante Stripe.  

**Administradores:**  
- Gestionar productos, usuarios y pedidos desde el panel administrativo.  

El sistema combina **frontend y backend** en la misma aplicación, integrando tanto la interfaz de usuario como la lógica de negocio.  

## 🛠️Tecnologías utilizadas
### Frontend  
- **Next.js** – framework de React para aplicaciones web modernas.  
- **Emotion Styled** – librería de estilos CSS-in-JS.  
- **Animate.css** – animaciones predefinidas.  
- **FontAwesome** – íconos para la UI.  
- **Axios** – cliente HTTP.  
- **Stripe.js + @stripe/react-stripe-js** – integración de pagos con tarjeta.  

### Backend  
- **Node.js + Express** – servidor backend.  
- **MongoDB / Mongoose** – base de datos NoSQL.  
- **JWT + bcryptjs** – autenticación y seguridad.  
- **Multer** – gestión de archivos (imágenes de productos).  
- **dotenv y cors** – configuración y seguridad.  

## ⚙️Instalación y ejecución  

```bash
# 1. Clonar el repositorio
git clone https://github.com/EdannyDev/games-app.git

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
Frontend (Next.js) .env.local

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

Backend (Express) .env

PORT=5000
MONGO_URI=mongodb://localhost:27017/gamesDB
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
- Archivos estáticos: `/uploads`
- Usuarios: `/api/users`
- Juegos: `/api/games`

## ✨Características principales
- Carrito de compras con pagos seguros mediante Stripe.
- Catálogo dinámico de videojuegos, con detalles y búsqueda.
- Autenticación de usuarios con roles (usuario y administrador).
- Panel administrativo: Los administradores podrán gestionar juegos y usuarios.
- Subida de imágenes para productos mediante Multer.
- Interfaz moderna y animada con Emotion Styled, Animate.css y FontAwesome.
