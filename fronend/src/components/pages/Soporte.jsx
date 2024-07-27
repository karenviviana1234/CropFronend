import React, { useEffect, useState } from "react";
import Header from "../organismos/Header/Header";
import "./VistasCss.css";
import v from "../../styles/variables.jsx";
import Icon from "../atomos/Sidebar/IconosSidebar.jsx";
import { Link } from "react-router-dom"

function Soporte() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [userRole, setUserRole] = useState('');


  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  useEffect(() => {
    // Obtener el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.rol);
    }
  }, []);

  return (
    <div
      className={`contenidos ${sidebarAbierto ? "contenido-extendidos" : ""}`}
    >
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='bg-cover bg-center mt-16 mb-16' style={{ backgroundImage: `url(${v.image13})`, height: '480px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className=" overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'">
          <h3 className=' text-custom-white text-center' style={{ fontSize: '24px', paddingTop: '150px' }}>Estamos para ayudarte</h3>
          <h1 className='text-center text-custom-white' style={{ fontSize: '70px' }}>Bienvenidos a Soporte de CropLink</h1>
        </div>
      </div>
      
      <div className="pb-16 text-center">
      {userRole !== 'empleado' && (
        <div>
        <h1 className='text-4xl text-center my-5'>Servicios</h1>
        <div className="flex justify-center">
          <div className=" w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl" >
            <Link to="/Usuario" className="cursor-pointer hover:text-green no-underline hover:no-underline">
              <Icon icon={v.iconoAgregarUsuario} className="mx-5 w-12 h-14 text-center" />
              <h1 className="text-center" style={{ fontSize: '18px' }}>Registro de</h1>
              <h1 className="text-center" style={{ fontSize: '18px' }}>Empleados</h1>
            </Link>
          </div>

          <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
          <Link to="/" className="cursor-pointer hover:text-green no-underline hover:no-underline">
            <Icon icon={v.iconoGrafica} className="mx-5 w-12 h-14 text-center" />
            <h1 className="text-center" style={{ fontSize: '18px' }}>Graficas en</h1>
            <h1 className="text-center" style={{ fontSize: '18px' }}>Tiempo Real</h1>
            </Link>
          </div>

          <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
          <Link to="/Mapa" className="cursor-pointer hover:text-green no-underline hover:no-underline">
            <Icon icon={v.iconoMapa} className="mx-5 w-12 h-14 text-center" />
            <h1 className="text-center" style={{ fontSize: '18px' }}>Mapa Interactivo</h1>
            <h1 className="text-center" style={{ fontSize: '18px' }}>en Tiempo Real</h1>
            </Link>
          </div>

          <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
          <Link to="/Finca" className=" cursor-pointer hover:text-green no-underline hover:no-underline">
              <Icon icon={v.iconoDescargar} className="mx-5 w-12 h-14 text-center" />
              <h1 className="text-center" style={{ fontSize: '18px' }}>Descarga</h1>
              <h1 className="text-center" style={{ fontSize: '18px' }}>Reportes</h1>
            </Link>
          </div>
          </div>
        </div>
         )}
        <div className="flex justify-center my-5">
          <div className="bg-custom-white mt-10 items-center flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl" >
          <Link to="/update-password" className="flex justify-between items-center cursor-pointer hover:text-green no-underline hover:no-underline">
            <Icon icon={v.iconoCandado} className="mx-3 w-9 h-9 text-center text-green" />
            <h1 className="text-center" style={{ fontSize: '18px' }}>Recuperacion de <br /> Contraseña</h1>
            </Link>
          </div>
          <div className="bg-custom-white mt-10 items-center flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl " >
          <Link to="/" className="flex justify-between items-center cursor-pointer hover:text-green no-underline hover:no-underline">
            <Icon icon={v.iconoDocumento} className="mx-3 w-9 h-9 text-center text-green" />
            <h1 className="text-center" style={{ fontSize: '18px' }}>Documentacion<br /> de CropLink</h1>
            </Link>
          </div>
          <div className="bg-custom-white mt-10 flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl " >
          <Link to="/" className="flex justify-between items-center cursor-pointer hover:text-green no-underline hover:no-underline">
            <Icon icon={v.iconoTelefono} className="mx-3 w-9 h-9 text-green" />
            <h1 className="" style={{ fontSize: '18px' }}>Instala Nuestra<br /> App Movil</h1>
            </Link>
          </div>
        </div>
        <h1 className='text-4xl text-center mt-20 mb-10'>Nuestro Equipo</h1>
        <div className="flex content-center">
          <div className="mx-20 w-50">
            <p className="text-justify leading-relaxed" style={{ fontSize: '18px' }}>
              Somos un equipo de cuatro aprendices en análisis y desarrollo de software, cada uno con diferentes habilidades que han sido cruciales para el desarrollo de CropLink. Desde la programación y el diseño de interfaces de usuario hasta la gestión de bases de datos y la implementación de seguridad, cada miembro del equipo ha desempeñado un rol específico que ha hecho posible la creación de esta plataforma.
              <br />
              <br />
              Nos hemos esforzado por integrar nuestras competencias y trabajar en sinergia para superar los desafíos que se presentaron a lo largo del proyecto.
              <br />
              <br />
              Cabe resaltar que las bases para la creación de CropLink fueron proporcionadas por el Servicio Nacional de Aprendizaje (SENA). Este prestigioso instituto nos ha brindado no solo la formación técnica necesaria, sino también un ambiente de aprendizaje colaborativo.
              <br />
              <br />
              Instructores dedicados y compañeros entusiastas han aportado conocimientos clave y apoyo constante, lo que ha sido fundamental para la ejecución exitosa de este proyecto. Gracias a este soporte, hemos podido convertir una idea en una solución tangible que esperamos sea de gran utilidad para nuestros usuarios.</p>
          </div>
          <div className="mr-20 flex items-center">
            <h1>Imagen Grupal</h1>
          </div>
        </div>
        <div className="mx-20 grid grid-cols-2 gap-6 my-20">
  <div className="p-4 border rounded-lg shadow-md text-justify">
    <h3 className="text-xl font-bold mb-2">Karen Viviana Diaz Guevara</h3>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">Rol:</h2>
      <p className="text-gray-700">Líder del Proyecto y Desarrolladora Full-Stack</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">Responsabilidades:</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>Liderazgo del equipo</li>
        <li>Seguridad del proyecto</li>
        <li>Implementación de recuperación de contraseña</li>
        <li>Desarrollo de interfaces de producción, usuarios, registro e inicio de sesión</li>
        <li>Contribución a la documentación del proyecto</li>
      </ul>
    </div>
    <div className="mt-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">GitHub:</h2>
      <a href="https://github.com/karenviviana1234" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://github.com/karenviviana1234</a>
    </div>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">LinkedIn:</h2>
      <a href="#" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://linkedin.com/karenviviana1234</a>
    </div>
  </div>

  <div className="p-4 border rounded-lg shadow-md text-justify">
    <h3 className="text-xl font-bold mb-2">Sharit Daniela Vargas Almario</h3>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">Rol:</h2>
      <p className="text-gray-700">Diseñadora Frontend y Desarrolladora UI/UX</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">Responsabilidades:</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>Diseño de frontend, estilos y colores</li>
        <li>Creación del Logo</li>
        <li>Desarrollo de interfaces de Soporte, Inicio (Dashboard), Cultivos, Costos</li>
        <li>Generación de PDFs y gráficos</li>
        <li>Elaboración de carátulas para Manuales</li>
        <li>Contribución a la documentación del proyecto</li>
      </ul>
    </div>
    <div className="mt-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">GitHub:</h2>
      <a href="https://github.com/Sharit-Vargas07" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://github.com/Sharit-Vargas07</a>
    </div>
    <div className="flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">LinkedIn:</h2>
      <a href="#" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://linkedin.com/Sharit-Vargas07</a>
    </div>
  </div>

  <div className="p-4 border rounded-lg shadow-md text-justify">
    <h3 className="text-xl font-bold mb-2">Daniel Felipe Gonzalez Bravo</h3>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">Rol:</h2>
      <p className="text-gray-700">Administrador de Bases de Datos y Desarrollador Backend</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">Responsabilidades:</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>Mantenimiento de la base de datos.</li>
        <li>Desarrollo de algunos controladores para la manipulación de datos.</li>
        <li>Creación y actualización del mapa interactivo.</li>
        <li>Implementación de consultas y optimización del rendimiento de la base de datos.</li>
        <li>Colaboración en la documentación técnica relacionada con la base de datos y controladores.</li>
      </ul>
    </div>
    <div className="mt-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">GitHub:</h2>
      <a href="https://github.com/bravodaniel12" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://github.com/bravodaniel12</a>
    </div>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">LinkedIn:</h2>
      <a href="#" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://linkedin.com/DanielGonzalezBravo</a>
    </div>
  </div>

  <div className="p-4 border rounded-lg shadow-md text-justify">
    <h3 className="text-xl font-bold mb-2">Dario Jose Zamora Vargas</h3>
    <div className="mb-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">Rol:</h2>
      <p className="text-gray-700">Desarrollador de Aplicaciones Móviles y Desarrollador Backend</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">Responsabilidades:</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>Desarrollo y mantenimiento de la aplicación móvil.</li>
        <li>Colaboración en la documentación técnica del proyecto.</li>
        <li>Apoyo en el desarrollo de controladores y lógica de negocio en el backend.</li>
        <li>Integración de la aplicación móvil con otros servicios del sistema.</li>
        <li>Desarrollo de Interfaces Asignacion, Variedad, Lote.</li>
      </ul>
    </div>
    <div className="mt-2 flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">GitHub:</h2>
      <a href="https://github.com/josedvargas31" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://github.com/josedvargas31</a>
    </div>
    <div className="flex items-baseline">
      <h2 className="text-lg font-semibold mr-2">LinkedIn:</h2>
      <a href="#" className="text-gray-700 cursor-pointer hover:text-green hover:underline">https://linkedin.com/DarioZamoraVargas</a>
    </div>
  </div>
</div>

      </div>

    </div>
  );
}

export default Soporte;