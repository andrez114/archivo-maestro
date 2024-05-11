## v1.6.2[kodashi]-(Noviembre 2019)

### Novedades

- Se modifico directiva soloNumeros, con un detalle en su ngModel que causaba inconsistencia.
- Se agrego componente para descargar o mostrar PDF (openPDF), el cual se encuentra en una carpeta nueva sharedComponents.

### Contribuyentes

- Juan Carlos Sanchez Lopez

## v1.6.1[nabiki]-(Septiembre 2019)

### Novedades

- Se modifico el db.json, para que cumpla la estructura de wsempleados, y asi en tiempo de desarrollo accesar a los
  atributos de manera consistente.

- Se agrego descripcion en los servicios de example para la utilizacion de envio de body en peticiones de tipo 'Delete'.

### Contribuyentes

- Yaxaira Sarahí Melendres López

## v1.6.0[akane]-(Junio 2019)

### Novedades

- Se agrego un environment nuevo `environment.dev.ts`, el cual sirve para deployar en servidores de desarrollo el bundle (dist), para ello se debe ejecutar la instruccion `npm run build:dev`, este generara un distribuible, con las constantes definidas en el archivo `environment.dev` , cabe mencionar que el atributo de `production` debe ser `true`.
- Se modifico la autenticacion cuando el ambiente es desarrollo, ahora autentiaca en el miniserver que viene incluido, generando un token de sesion local, el cual viene configurado en `environment` .
- Se agrego script para ejecutar la aplicacion y el miniserver con ip para poder compartir su ruta y ver lo de desarrolo en otra micro; para ello se deben modificar los siguientes parametro `--host` con la ip de la micro, en los siguientes scripts:

  ```typescript

    "json-start-shared": "nodemon server.js --host [ip de la micro] --port 3200",
    "start-shared": "ng serve --host [ip de la micro]",
  ```

  posteriormente ejecutar el compando `npm run dev:shared` y listo se ejecutara como normalmente pero ahora sera necesario indicar en el navegador la ip en vez de localhost.

- Se elimino el redirect para los errores 401 y 403, delegandolo al desarrollador.
- Se modifico el servicio de menu para agregar queryParams.
- Se agrego al interceptor, el wrap de meta y data, para respuestas, y manejo de errores, de tal manera que siempre se reciba, la misma estructura.
- Se actualizo biblioteca ngx-bootstrap ~4.0.0
- Se agrego archivo para auditoria de codigo, el cual es necesario configurar de manera manual (teporalmente), para que se realize
  una auditoria de codigo del proyecto.
- Se agrego `husky` como intermediario, para los pre-commits de código, no se podra hacer commit si no se cumplen con las reglas
  de tslint.

## v1.5.2[saori-kiddo-ts]-(Febrero 2019)

### Novedades

- Se downgradeo version de biblioteca ngx-bootstrap de la version 3.1.1 a version 3.0.1 debido a incompatibilidad
  en modo de build con angular 7.

## v1.5.1[saori-kiddo]-(Febrero 2019)

### Novedades

- Se corrigio código, para cumplir con nuevas reglas de sonarlint, principalmente codeSmells.

## v1.5.0[saori]-(Diciembre 2018)

### Novedades

- Se actualizo README describiendo las mejoras incursionadas.
- Se actualizo primeNG a version 7+.
- Se agrego el script `json-start` al package json para ejecutar un servidor mock rest.
- Se añade el archivo `db.json`, se describe en la documentación.
- Se añade el script `dev` el cual implementa dos tareas paralelas `npm run start & npm run json-start`), el cual ahora es necesario para levantar la instancia en modo desarollo.
- Se agrego la dependencia json-server, para mockear rest apis locales.
- Se modifico el modulo example, que ahora se conecta al servidor mock, asi como unas mejoras para un filtrado, y se agrego un typeahead para buscar elementos.
- Se modifico el servicio `MenuService`, para conectarse al seridor mock.
- Se incluye el archivo v1.5.0 que contiene datos sobre la version.

## v1.4.2[mina-chan2]-(Noviembre 2018)

### Novedades

- Se elimino codeSmells del proyecto.
- Fixed Version de Bibliotecas.
- Se añade archivo para auditoria de codigo `sonar-project.properties`

## v1.4.1[mina-chan]-(Noviembre 2018)

### Novedades

- Se actualizo a version 7 de Angular ya que la version 6.2.x, en equipos mac, existe un error.

## v1.4.0[mina]-(Octubre 2018)

### Novedades

- Se modifico el componente menu, para recibir mediante `./assets/settings.json`, el atribto apiMenu, que en caso de no existir, ira por el archivo `./assets/menu.json`
- Se actualizo primeNG, y cambio tema de omega a nova-light
- Se elimino modulo taller, y se creo el modulo example que contiene mas ejemplificaciones de integracion.
- Se Modifico directiva RestringirTipo, para ser configurable, mas info en http://developers.coppel.com/angular2docs

### Correcciones

- Se elimino la carpeta img de raiz, ya que se cuenta con una en `./assets/img`
- Se corrigio bug cuando se deshabilita el menu, y la aplicacion en modo responsivo en resoluciones pequeñas mostraba el boton de menu y al hacer click recorria el contenido.
- Se corrigio directiva restringir tipos, ya que no estaba permitiendo teclear con numPad.

### Contribuciones

- Martin Enrique Gutierrez Reyes

=============================

## v1.3.0[azumi]-(Septiembre 2018)

### Novedades

- Se incluye componente ngxQuill, que es un WysiwygEditor.
- Se incluye componente textMask, para creación de mascaras en cajas de texto.
- Se incluye ng2Fileupload, para subir archivos.
- Se actualizo ag-grid a version community

=============================

## v1.2.1[kiri]-(Septiembre 2018)

### Novedades

- Se agrego funcionalidad a la directiva de RestringirTipo para aceptar numeros negativos ademas de un fix para compatibilidad con Navius.

=============================

### Novedades

- Se cambio el metodo localStorage por sessionStorage, dentro de la autenticacion de usuario.
- Se corrigio package.json con actualizacion de dependencias.
- Se corrigio messageSuccess ya que ejecutaba el error en vez de success.
- Se corrigio ng-select style, ya que no estaba agregdo.

## v1.2.0[kiri]-(Junio 2018)

=============================

### Novedades

- Se incluye clase mensaje, que extinde de toaster, para generar notificaciones flotates basadas en severidad del mensaje.
- Se incluye servicio de params para la paginacion en conjunto con el primeng-table.
- Se incluye libreria text-mask, para crear mascaras en los inputs.

## v1.1.0[ebina]-(Abril 2018)

=============================

### Novedades

- Actualizacion del core de angular 2.5 a angular 2.6.
- Se incluye configuracion para tener aplicaciones InHouse o Intranet.
- Se incluye libreria de graficas (chartjs).

## v1.0.0[umaru]-(Enero 2018)

==============================

### Novedades

Primer version de generador de scaffolding para aplicaciones web coppel con base de framework Angular V2.5
