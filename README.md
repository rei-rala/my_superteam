# SuperTeam.  
<i>19-08-2021</i>
Challenge para Alkemy | React + SuperHero API
<hr>

## Sobre el proyecto

<figure>
  <figcaption><h4>Librerias</h4></figcaption>
  <ul>
    <li><code>Axios</code></li>
    <li><code>Node-Sass</code></li>
    <li><code>React JS</code></li>
    <li><code>React Router</code></li>
  </ul>
</figure>

### Funcionalidades

<figure>
  <figcaption><h4> Featuring: UI </h4></figcaption>
  <ul>
    <li><i>Responsive</i> en desktop, mobile portrait y landscape.</li>
    <li>Diseño <i>glassmorphist</i>.</li>
    <li>Se incorporo un indicador de carga en secciones donde   correspondiera.</li>
    <li>Se incorporaron animaciones y transiciones en buena parte del sitio para suavizar las vistas y cambios.</li>
    <li>Se manipulan las excepciones en tipo de dato (Ej: <code>xPowerStat = 'Null'</code>)  y errores <code>404</code> de imagenes.</li>
    <li> <b>Header</b>
      <ul> 
        <li> Sin iniciar sesion mostrara solo logo.</li>
        <li> Se añade un estilo al navbar segun la pagina en la que se encuentre el usuario.</li>
        <li> Se muestra el nombre de usuario y el boton accesible para cerrar la sesion.</li>
        <li> Version mobile con menu clickeable + desplegable</li>
      </ul>
     </li>
    <li> <b>Footer</b>
      <ul> 
        <li> De acuerdo a tu ubicacion te lleva a home o a search .</li>
        <li> Al scrollear puede llevarte a top.</li>
        <li> Aporta datos de la   composicion de tu equipo por alignment y tambien cuando se llega al tope  de   heroes.</li>
      </ul>
     </li>
    <li> <b>Home</b>
      <ul> 
        <li> Administra tu superteam.</li>
        <li> Ve el resumen de powerstats totales y promedios.</li>
        <li> Ordena tus heroes de acuerdo a sus diferentes caracteristicas.</li>
        <li>accede a los detalles de tu heroe para conocer mas de tu  equipo.</li>
      </ul>
    </li>
    <li> <b>Busqueda</b>
      <ul>
        <li> La busqueda de heroes se realiza mientras tecleas, recibes tambien   un  indicador de cantidad de resultados.</li>
        <li> Oculta y muestra rapidamente el cuadro de busqueda.</li>
        <li> Puedes ordenar la lista de heroes encontrados de acuerdo a   diversas  caracteristicas.</li>
        <li> Los heroes muestran a simple vista su alignment mediante el color  de   su borde y botones.</li>
        <li> Puedes acceder a la informacion del heroe clickeando su nombre .</li>
        <li> Agrega o quita de tu equipo a un heroe desde la busqueda.</li>
        <li> Clickea sobre la imagen de un heroe para ver sus powerstats, o   activa  la opcion para que esto se realice al pasar encima con el   puntero.</li>
        <li> Puedes navegar entre secciones sin perder tu ultima busqueda.</li>
      </ul>
    </li>

  </ul>
</figure>
<br />

<figure>
  <figcaption><h5> Featuring: Funcional </h5></figcaption>
  <ul>
    <li><b>Contexts</b>:
      <ul>
        <li> User Session Manager: Para ayudar a restringir el acceso solo a    usuarios registrados con sesion iniciada.</li>
        <li> SuperTeam Manager: Administra estadisticas o haz ediciones sobre   tu  equipo.</li>
        <li> Search Holder: Mantiene tu ultima busqueda de heroes.</li>
      </ul>
    </li>
    <li><b>Routing</b> (React Router):
      <ul>
        <li> <code>/login</code> : Iniciar sesion.</li>
        <li> <code>/home</code> : Panel de usuario, el usuario vera a los     heroes  y su informacion ademas de un resumen del equipo.</li>
        <li> <code>/search</code> : Pagina de busqueda de heroes.</li>
        <li> <code>/hero/{heroId}</code> : Vista detallada   de  un heroe.</li>
      </ul>
    </li>
  </ul>
</figure>

<hr>

###### Default CRA Readme
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
