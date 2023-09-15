Fidelis Global Bank - Aplicación Bancaria
Esta aplicación bancaria permite a los usuarios registrarse, iniciar sesión y realizar diversas operaciones bancarias. Fidelis Global Bank se ha desarrollado utilizando Node.js y Express, y se utiliza un sistema de autenticación basado en JSON Web Tokens (JWT) para garantizar la seguridad de las transacciones.

Requisitos Previos
Antes de ejecutar la aplicación, asegúrese de tener instalados los siguientes componentes:

Node.js: Descargar e instalar Node.js
PostgreSQL: Descargar e instalar PostgreSQL


Luego debes instalar las dependencias

npm install
Configuración

Asegúrese de configurar correctamente las variables de entorno. Puede hacerlo creando un archivo .env en el directorio raíz del proyecto y configurando las siguientes variables:

Ademas se encuentra el Archivo db.sql con las query necesarias.


DB_HOST=nombre_de_host_de_la_base_de_datos
DB_USER=nombre_de_usuario_de_la_base_de_datos
DB_PASSWORD=contraseña_de_la_base_de_datos
DB_DATABASE=nombre_de_la_base_de_datos
JWT_SECRET=clave_secreta_para_jwt

Uso
Iniciar la Aplicación en Modo de Desarrollo
Puede iniciar la aplicación en modo de desarrollo utilizando el siguiente comando:

npm run dev

Iniciar la Aplicación en Modo de Producción
Para iniciar la aplicación en modo de producción, ejecute:


npm start

Funcionalidades Principales
La aplicación Fidelis Global Bank ofrece las siguientes funcionalidades:

Registro de Nuevos Usuarios: Proporciona un formulario para que los nuevos usuarios se registren en el banco.

Inicio de Sesión: Permite a los usuarios existentes iniciar sesión en el banco.

Operaciones Bancarias: Una vez que los usuarios hayan iniciado sesión, pueden realizar las siguientes operaciones:

a. Efectuar transferencias a otros usuarios.

b. Consultar el historial de transferencias realizadas en una tabla con paginación.

c. Modificar sus datos personales.

d. Eliminar su cuenta bancaria.

Validación de Beneficiarios: Las transferencias solo se procesarán si los datos del beneficiario están registrados en la base de datos.

Seguridad con JWT: El sistema bancario implementa restricciones de acceso basadas en JSON Web Tokens (JWT) para garantizar la seguridad de las transacciones.