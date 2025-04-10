# Proyecto Viamatica

Este es el proyecto Viamatica, una aplicación full-stack que utiliza **Angular** para el frontend y **Express** para el backend. A continuación se proporciona información sobre las versiones de las tecnologías utilizadas, así como las instrucciones para instalar y ejecutar el sistema.

## Tecnologías Utilizadas

- **Node.js**: v20.12.12
- **Angular**: v17
- **Express**: v5.1.0
- **Bootstrap**: v5
- **MongoDB**: Base de datos NoSQL para el backend.

## Instalación
### Backend (Express)
En la parte de backend
-cd backend
-npm install
-npm install express --save
-npm install cors --save
-npm install mongoose --save


Para la base de datos :
Luego, en tu database.js (const URI = 'mongodb://127.0.0.1/viamatica2025';) en tu mongoodb local cambias 
el final creando la tabla local.
 
Luego inicias el proyecto

-npm run dev (si es que instalas- npm install nodemon -D) o 
sino node index.js


### Frontend (Angular v17) 
--cd viamatica-frontend
-npm install
- ng serve -o  

Para el frontend, el proyecto se levantará en el puerto 4200 por defecto.


### POSTMAN 
Para facilitar la prueba de las APIs, puedes usar el archivo de exportación de Postman 
que contiene todas las colecciones de pruebas configuradas.

-Descarga el archivo de exportación de Postman desde el repositorio 
del backend (se encuentra en la carpeta Postman o donde esté guardado).
-Abre Postman y haz clic en "Importar" (botón en la parte superior izquierda).
Creación de un Admin:

*************Antes de probar las rutas que requieren autenticación, asegúrate de 
crear un usuario Admin en la base de datos para poder realizar pruebas de acceso autenticado.**************

Puedes crear un admin usando las rutas de registro del backend.

## Ejemplo archivoo excel
Tambien se encuentra un Ejemplo de un archivo excel para subir en el front o postman en el metodo 
de carga masiva de usuarios
---

## Finalización

Con estos pasos, deberías tener el proyecto funcionando tanto en el **backend** como en el **frontend**. 
**Viamatica**!

