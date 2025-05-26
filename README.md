# Bookish Octo Winner API

API REST para gestión de productos y usuarios de una tienda fantástica.

## Requisitos
- Node.js >= 14
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
node index.js
```

La API estará disponible en `http://localhost:3003` por defecto.

## Endpoints disponibles

### Productos
- `GET    /products`           → Listar todos los productos
- `GET    /products/:id`       → Obtener un producto por ID
- `POST   /products`           → Crear un producto
- `PUT    /products/:id`       → Actualizar un producto
- `DELETE /products/:id`       → Eliminar un producto

### Usuarios
- `GET    /users`              → Listar todos los usuarios
- `GET    /users/:id`          → Obtener un usuario por ID
- `POST   /users`              → Crear un usuario
- `PUT    /users/:id`          → Actualizar un usuario
- `DELETE /users/:id`          → Eliminar un usuario

## Estructura del proyecto
- `controllers/` — Lógica de negocio
- `db/` — Archivos JSON de datos
- `routes/` — Definición de rutas
- `index.js` — Punto de entrada

---
¡Listo para la aventura!
