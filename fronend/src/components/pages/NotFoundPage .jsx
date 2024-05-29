import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="bg-blancoMedio1 flex h-screen items-center justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-20">
        <div className="text-center md:text-left">
          <h2 className="text-grisOscuro text-5xl font-semibold">ERROR 404</h2>
          <h1 className="text-grisMedio3 text-5xl mb-3 md:mt-20 md:mb-6">
            Vaya, parece que estas intentando dirigirte a una página que no existe.
          </h1>
          <p className="text-grisOscuro text-xl mb-8">
            Intenta ingresar direcciones correctas!
          </p>
          <Link to="/" className="bg-grisMedio3 hover:bg-grisOscuro text-blanco font-semibold text-base py-3 px-6 rounded-lg transition duration-200 border">
            Volver al Inicio
          </Link> 
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;