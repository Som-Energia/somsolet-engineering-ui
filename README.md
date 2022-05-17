# Docs

## Arquitectura

La arquitectura del proyecto se separa entre las carpetas _containers_ y _components_.

La idea es que los _containers_ contengan las rutas/páginas de la aplicación y que contengan la mayor parte de lógica de estas como por ejemplo _dispatches_, manejadores de eventos, pequeñas transformaciones, etc.

Por otras partes la carpeta de _components_ es contener todos aquellos componentes que se encargan de renderizar la información, sin ningún tipo de lógica.

## Redux

Este proyecto contiene _redux_ para manejar el estado global de la aplicación. Está separado en la carpeta _actions_, _reducers_ y el fichero _store.js_.

El archivo _store.js_ contiene todos los _reducers_ de la aplicación donde se almacena todo. En este caso existe un estado global para la parte de autentificación y otra con los datos de las campañas.

En la carpeta _actions_ guardamos los métodos que disparan eventos mediante el _hook_ _dispatch_, estos pueden ser llamadas al api o cambios que queramos guardar dentro de nuestro estado global de la aplicación.

En el caso de llamadas al api, los _request_ devuelven un _payload_ que será interceptado en el fichero _interceptors/config.js_ donde se alimentará el estado de la llamada mediante _\_SUCCESS_ o _\_FAIL_ para detectar si la llamada realizada ha sido un éxito o un fallo. Esta estrategia permite poder manejar el estado de cada llamada añadiendo lógicas asíncronas de forma sencilla.

La forma que tenemos de conectar los _actions_ y los _reducers_ es mediante la clave _type_ que definimos en _action_ y que coincide en el _reducer_.

Una vez tenemos definidos los _actions_ y el _reducer_ que maneja el estado, utilizamos el _hook_ `useSelector()` para consultar el campo que queremos dentro de nuestro _container_.

Es posible que nos surja la duda de si realizar la consulta desde los componentes o desde los _containers_, en este caso yo prefiero hacer toda esa lógica en los _containers_ y pasar los datos hacia los hijos para intentar tener la mayor lógica posible en los contendores.

### Transformaciones de llamadas

En algunos casos, para intentar que los datos lleguen al contendor de la forma más sencilla posible se pueden utilizar funciones o métodos de transformación para que, antes de guardarlos en el estado de la aplicación, tengan una estructura más sencilla de leer.

Es el caso que tenemos en el fichero `reducers/campaigns.js` donde el método `transformProjectsToTable` recibe la llamada del api y lo formatea para que tenga la estructura que demanda la tabla del detalle de campaña.

En un caso ideal, el api debería de devolver la mejor estructura posible para el _frontend_, pero como digo es un caso bastante común que necesitemos un formato que nos facilite el renderizado.

Si bien esta transformación la podríamos hacer en los contenedores creo que esta estrategia nos puede ayudar a que los contenedores queden lo más limpios posibles.

## Estilos

Los estilos de la aplicación estan realizados con el _styled-components_ de forma global existe un tema definido en la carpeta _theme_ y que se puede usar dentro de cualquier componente estilado, pudiendo añadir lógicas de javascript dentro de cada uno de ellos mediante _props_.

A nivel de arquitectura los estilos se mantienen dentro del mismo archivo, sería posible separarlos aunque prefiero que todo esté en el mismo fichero para que el mantenimiento sea más sencillo.

Si un archivo se hace demasiado grande y crece en líneas lo ideal sería hacer una separación para intentar que no crezcan demasiado.

## Traducciones

Las traducciones se hacen de la misma forma que hacemos en los otros proyectos. En ese caso que querido mantener la misma metodolgía

# Instalar proyecto

Para instalar el proyecto podemos hacerlo mediante `npm install` o `yarn install`

# Iniciar proyecto

Para iniciar el proyecto podemos hacerlo mediante `npm start` o `yarn start`
