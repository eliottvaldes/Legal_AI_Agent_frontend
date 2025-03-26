# Frontend Chat Legal

Este proyecto corresponde a la capa de **frontend** de un sistema de chat que se conecta a un único endpoint HTTP (`POST /chat`). Desde aquí, el usuario puede enviar mensajes en lenguaje natural y recibir respuestas con diferentes propósitos, entre ellos la gestión de casos o preguntas generales.

## Estructura General del Proyecto

```
frontend/
├── node_modules/
├── src/
│   ├── components/
│   │   └── Chat.jsx      # Componente principal del chat
│   ├── App.jsx           # Contenedor principal que renderiza el Chat
│   ├── main.jsx          # Punto de entrada de React
│   └── index.css         # Estilos opcionales
├── index.html            # Punto de entrada HTML; incluye el CDN de Bootstrap
├── package.json          # Dependencias y scripts de Yarn
└── vite.config.js        # Configuración de Vite
```

### Puntos Clave del Frontend

1. **Create React App con Vite**  
   El proyecto se inició utilizando Vite como herramienta de bundling y se manejan dependencias con Yarn.  
   
2. **Uso de Bootstrap por CDN**  
   El archivo `index.html` importa Bootstrap a través de un enlace CDN para los estilos (`.css`) y un script para la parte de JavaScript (Bundle).

3. **Componente `Chat.jsx`**  
   - Muestra un área de conversación donde cada mensaje se alinea según su remitente:  
     - **Mensajes del usuario**: alineados a la derecha, con fondo en un color distintivo (clase `bg-primary text-white`).  
     - **Respuestas del sistema**: alineadas a la izquierda, con fondo neutro (clase `bg-secondary text-white`).  
   - Permite el envío de mensajes a través de un `<form>` que, al hacer submit, ejecuta una petición `POST` al endpoint.  
   - Muestra alertas de error en caso de respuestas fallidas o problemas de conexión.  
   - Si la respuesta incluye un array de datos en la propiedad `data`, se renderiza una tabla con la información.  

4. **Flujo de Mensajes**
   - El usuario ingresa texto en un `input` y presiona **Enviar** o la tecla **Enter**.  
   - El frontend envía el contenido a `http://127.0.0.1:8000/chat` (por método POST).  
   - Se muestra de inmediato el mensaje del usuario en el lado derecho de la conversación.  
   - Cuando llega la respuesta del servidor:  
     - Si `success` es `true`, se agrega un nuevo mensaje en el lado izquierdo con el `message` y la tabla con los contenidos de `data` (si aplica).  
     - Si `success` es `false`, se muestra una alerta (alert de Bootstrap) que se desvanece después de unos segundos.  

## Instrucciones para Levantar el Ambiente de Desarrollo

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión estable recomendada).
- [Yarn](https://yarnpkg.com/) instalado globalmente.

### Pasos de Instalación

1. **Clonar o descargar el repositorio**  
   Ubícate en la carpeta raíz del frontend.

2. **Instalar dependencias**  
   ```bash
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**  
   ```bash
   yarn dev
   ```
   El proyecto se iniciará normalmente en `http://localhost:3000` o la URL que indique la consola.

4. **Verificación**  
   - Accede desde tu navegador a la URL correspondiente.  
   - Deberás ver el chat donde puedes escribir mensajes y observar las respuestas.  

Con estos pasos tendrás el frontend listo para interactuar con el endpoint `POST /chat`.  
Si deseas personalizar la dirección del backend, ajusta la URL en el componente `Chat.jsx`, dentro de la función `handleSubmit`.
