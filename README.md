# Backend de gestion de usuarios

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- dotenv
- bcryptjs
- cors

## Estructura del proyecto

- /controller/auth.controller.js Lógica de login y registro.
- /auth/* Middlewares que verifican JWT y roles.
- /models/user.model.js esquema del usuario.
- /routes/auth.routes.js Direccion de endpoints de login, registro y listado de usuarios (Sin mostrar contraseña).

## Instalación

NOTA: Revisar el branch de Desarrollo en este mismo repositorio.

1. Clonar el repositorio:

```bash
git clone https://github.com/Tian-co2103/Backend-final-project-web-development.git

```

2. Instalar las dependencias

```
npm install
```
3. crea un archivo .env con el siguiente contenido:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/nombreDeTuBD
JWT_SECRET=tu_clave_secreta
```

4. inicia el servidor con el comando:

```
npm start
```
