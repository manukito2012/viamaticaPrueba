# Proyecto Viamatica

Este es el proyecto Viamatica, una aplicación full-stack que utiliza **Angular** para el frontend y **NestJS** para el backend. A continuación se proporciona información sobre las versiones de las tecnologías utilizadas, así como las instrucciones para instalar y ejecutar el sistema.

## Tecnologías Utilizadas

- **Node.js**: v20.12.12
- **Angular**: v17
- **NestJS**: v11.0.1
- **Bootstrap**: v5
- **MongoDB**: Base de datos NoSQL para el backend.

## Instalación
### Backend (NestJS)
En la parte de backend
-cd viamatica-backend
-npm install
-npm install @nestjs/mongoose mongoose


Para la base de datos :
Luego, en tu AppModule debes importar el MongooseModule y configurar la conexión con la URI de MongoDB :
 Si estás usando MongoDB en tu máquina local, la URI será: mongodb://localhost/viamaticajs . (al final colo el nombre que se creara en tu base de dato de mongoDB).

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/viamaticajs'),
    JwtModule.register({
      secret: 'KeyViamatica',
      signOptions: { expiresIn: '1h' },
    }),
    UsuariosModule,
    AuthModule
  ],


Luego inicias el proyecto

-npm run start


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


---

## Finalización

Con estos pasos, deberías tener el proyecto funcionando tanto en el **backend** como en el **frontend**. 
**Viamatica**!

