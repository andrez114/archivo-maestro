# Boilerplate-WebAngular2 v1.6.1

Este projecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4

**Boilerplate-WebAngular2** Es un proyecto de plantilla que tiene como base AngularV6 que provee un punto de inicio para aplicaciones WEB. El cual cuanta con las mejores practicas de designacion, en el arbol de directorios, basados en las reglas de Angular(aka 2), esto permite identificar facilmente donde se encuentra colocados los distintos componentes que van a conformar la aplicacion a desarrollar.

Este scaffolding, esta basado en la version anterior, (coppel-web-framework), que utilizaba AngularJS v1.x, esto para que la curva de aprendizaje del desarrollador, no se vea tan afectada y sienta que sigue trabajando bajo el mismo esquema.

## Prerequisitos

- NodeJS v8.11x <small>la version 10.x no esta soportada</small>

- Git

## Dependencias Globales Node

- npm install -g @angular/cli
- npm install -g @compodoc/compodoc
- npm install -g eslint
- npm install -g eslint-plugin-angular
- npm install -g protractor
- npm install -g rxjs-tslint
- npm install -g tslint
- npm install -g tslint-sonarts
- npm install -g typescript

## Lista de plugins VSCode

- Angular v6 Snippets by John Papa
- angular2-inline
- angular2-switcher
- Bootstrap 4 & Font awesome snippets
- ESLint
- GitLens
- HTML Snippets
- TSLint

- Auto Import
- Auto Rename Tag
- Bracket Pair Colorizer
- Prettier - Code formatter

## Clonar Repositorio Base

La creación de una aplicación con el framework requiere clonar del repositorio de gitlab.

```terminal
git clone http://gitlab.coppel.com/oc/boilerplate-webangular2.git [nombreProyecto]
```

Esta sentencia clonara el repositorio que contiene el framework, y lo contendra dentro de la carpeta
[nombreProyecto]

Una vez descargado, es necesario ejecutar el comando:

```terminal
npm install
```

para que instale las depenencias (componentes) necesarios para el entorno de desarrollo y de la aplicación.

En caso de que marque algun error donde involucre la libreria `node-sass`, hay que poner
la variable de entorno http_proxy, con el siguiente comando en la terminal: `set http_proxy=http://proxy.coppel.com:8080`
y volver a ejecutar `npm install`;

Se han encontrado equipos que por alguna situación al instalar las dependencias con `npm install` marcan error al momento de descomprimir haciendo alusion a permisos, la menera de instalar la dependencias, seria
de una por una, es decir se tiene que abrir el archivo `package.json` y ejecutar un `npm i` por cada dependincia a instalar.

En caso de que al ejecutar el comando `npm install` muestre algo como esto:

```terminal
npm WARN Invalid name: "nombre del proyecto"
npm WARN boilerplate-webangular2 No description
npm WARN boilerplate-webangular2 No repository field.
npm WARN boilerplate-webangular2 No README data
npm WARN boilerplate-webangular2 No license field.
```

Es necesario entrar al archivo `package.json` e ingresar los valores correspondientes a su aplicacion.
Esto solo aplica para la version v1.5.0 del framework.

Posterior a ello, ya que las dependencias estan instaladas ejecutar el comando

```terminal
npm run dev
```

Esto proporcionara, la instancia de nuestro frontend (aplicacion) y en otro hilo se estara ejecutando un servidor mock rest, que levanta el contenido del arhcivo `db.json`, del cual se describe mas adelante.

A continuacion se describe el scaffolding.

## Estructura de Directorios v.1.0.0 a v1.5.0

### src

Es el directorio que contiene a toda nuestra aplicacion, desde los modulos hasta variables de ambientes, los cuales se
describen a continuacion:

### app

Este directorio es el principal de la aplicacion en el se encuentra los modulos, directivas, servicios, modelos, y el core.

### app/containers

Este directorio contiene dos componentes que sirven para renderizar la aplicacion, cada uno para un caso en especifico:
full-layout, es para mostra menu y navbar, mientras que simple-layout no los contiene.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

### app/core

Este directorio contiene los componentes principales de la aplicación, como lo son el menu, navbar, asidebar, footer, etc.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

## app/directives

En esta carpeta se encuentran las directivas de uso general, asi como pipes para toda la aplicacion.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

## app/guards

Este directorio contiene un middleware, que pueden consumir las rutas definidas en nuestra app, para su acceso.
**_<sub>Nota: Este folder esta restringida su modificación.<sub>_**

## app/helpers

Este directorio contiene un interceptor para incrustar el jwt en cada peticiòn que se haga a la api correspondiente.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

## app/models

Este directorio contiene interfaces y/o clases genericas que se pueden implementar en los componentes.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

### app/modules

En este directorio se encuentran los modulos que se iran creando conforme el sistema o app crezca.
En el existen dos archivos principales que deben generarse:

- [nombremodulo].module.ts:\*\* Contiene la configuracion del modulo.
- [nombremodulo]-routing.module.ts: Contiene las rutas y subrutas para el modulo correspondiente.
- [componentes]: Adicionalmente cada moduloc cuenta con (n) cantidades de componentes que va a contener dicho modulo.

Asi mismo, este directorio puede contener si asi se requiere
los directorios:

- models: interfaces/clases - definiciones.
- services: servicios propios de dicho modulo
- modals: componentes modales
- directives: directivas propias
- styles: estilos propios (scss).

### app/services

Contiene servicios de uso generico de la aplicación, como lo son la autenticacion, y menu.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

- ### app/services/menu.service.ts
  Servicio que contiene ejemplo para consumir menu.json para construir el menu, en dado caso susitiuir la url por la api de su aplicaicon que genere el menu.

### assets

En este directorio se encuentra archivos referentes a imagenes, pdf, o cualquier otro archivo requerido por la aplicacion (contenido estatico).

### environments

En este directorio se encuentran tres archivos referentes a los ambientes que podemos proban con nuestra aplicacion:

- environment.ts: contiene las variables de configuracion que apuntan a un entorno de desarrollo o pruebas.

- environment.hmr.ts: contiene las variables para el ambiente hot-module-reload, que es que no es necesario recargar pantalla para probar componentes nuevos, igualmente es una especie de copia de envirnoment.ts que es desarrollo.

- environment.prod.ts: contiene las variables para el ambiente productivo.

      {
          production: false,
          hmr: false,
          inHouse: [false, true],
          configFile: 'assets/settings.json',
          SSO: 'http://devsso.coppel.com/api',
          STATIC: {
              webbridge: 'http://localhost:20542/api/huella',
              hojaAzul: 'http://10.44.15.147/hojaazul/fotos/',
          redirect: 'http://intranet.cln/intranet',
          },
          haveMenu: true,
          appLogo: 'assets/img/app-logo.png',
      }

  \*production(boolean): Indica el tipo de ambiente productivo(true); por default es false.

  \*hmr(boolean): Indica si se ejecutra en modo hot-module-reload. default(false).

  \*inHouse(array[boolean, boolean]): Indica si la aplicacion se autenticara con un login propio,(arg1[boolean]), y se si utilizara huella (arg2[boolean]),
  ej: inHouse[true, true], indica que se utilizara login con huella; inHouse[true, false], indica qeu se utilizara login, pero sin huella. Cabe destacar que si el arg1 esta en false, el segundo no es tomado en cuenta.

  \*configFile(string): Indica la ruta donde se encuentra el archivo de configuracion para la aplicación, asi como el nombre del archivo a leer.

  \*SSO(string): Indica la url de la api para utilizacion de SSO.

  \*STATIC(obj): contiene la estructura de etiquetas estaticas para la aplicacion:
  webbridge(string): Url de webbridge.
  hojaAzul(string): Url para obejer la imagen de la persona logueada, siempre y cuando sea un empleado.

  \*redirect(string): Indica la url a donde se redireccionara cuando el token es incorrecto.

  \*haveMenu(boolean): Indica si la aplicacion contara con algun menu lateral.

  \*appLogo(string): Indica la ruta del archivo a mostrar como logotipo de la aplicación.

### img

Este directorio contiene contenido estatico de imagenes.

### scss

Este directorio contiene los estilos que se impelmentan en la aplicacion.
**_<sub>Nota: Este folder esta restringida su modificación<sub>_**

## Servidor de Desarrollo

Ejecuta en la terminal `npm run start` para instanciar localmente un servidor web. Navega a la ruta `http://localhost:4200/`. La aplicación se recargara automaticamente si modificas cualquier archivo del codigo fuente.

## HMR (HOT MODULE RELOAD)

Ejecuta en la terminal `npm run hmr` para instanciar localmente un servidor web con HRM activado. Navega a la ruta `http://localhost:4200/`. La aplicación recargar el modulo que estes modificando del codigo fuente.

## Lista basica de comandos para generar modulos y componentes

Ejecuta en la terminal `ng generate module module-name --routing` para generar un modulo nuevo, con su arcihvo de ruta.

Ejecuta en la terminal `ng generate component component-name` para generar un nuevo componente. Adicionalmente existen
estos diferentes comandos `ng generate directive/pipe/service/class`.

Todos los servicios globales de la aplicacion deben estar declarados en el modulo principal (app.module.ts), con sus imports correspondientes.

## Compilar (Build)

Ejecuta en la terminal `npm run build` para generar un distribuible de la aplicación. La distribucion sera almacenada en el directorio `dist/`.

## Running unit tests (pendiente)

Ejecuta en la terminal `ng test` para ejecutar pruebas unitarias via [Karma](https://karma-runner.github.io).

## Running end-to-end tests (pendiente)

Ejecuta en la terminal `ng e2e` para ejecutar pruebas end-to-end via [Protractor](http://www.protractortest.org/).
Antes de correr las pruebas asegurae que la aplicacion este instanciada con `ng serve`.

## Más Ayuda

Mas ayuda para los comandos de Angular CLI use `ng help` o ir a [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Asi mismo [developers.coppel.com](developers.coppel.com) buscar Angular2.

## Obtener Datos de Sesion

Los datos de la persona logueada en el sistema se pueden accesar atravez del servicio
`AuthenticationService`, el cual expone el metodo `currentUser()`.
Este devolvera un objecto con los datos del empleado, la estructura, puede variar dependiendo el tipo de sesion elegida(inHouse).

## Acceso archivo settings.json / settings.prod.json

Este archivo contiene un objecto de strings, que se pueden ir agregando atributos para usos exclusivos de la aplicación como pueden ser url de apiRest, o bien datos fijos, o configuracion. Para accesar a dicho archivo se utiliza el servicio `ConfigService` el cual expone el metodo `getConfig()`; este retornara el objecto definido en dicho archivo.

## Archivo db.json

Este archivo contiene un mock de base de datos, de tipo json, el cual sirve para hacer pruebas en modo local simulando, las
distintas salidas o contrato de interfaces para las apis que se va a conectar el front-end.

## Archivo v*.*.\* ej.(v1.5.0)

Este archivo se agrega apartir de la version 1.5.0 del framework, el cual contiene los datos de version del framework, utilizado.
