import { Outlet } from "react-router-dom";
import Header from "../componentes/Header";

function Layout() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-5">
      <Header></Header>{" "}
      {/*Componente Header se renderizará en todas las paginas y rutas*/}
      {/* Aquí se renderizan las páginas hijas */}
      <Outlet />
    </div>
  );
}

export default Layout;
