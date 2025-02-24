import { Outlet } from "react-router-dom";
import Header from "../componentes/Header";

function Layout() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-3">
      <Header></Header>
      {/* Aquí se renderizan las páginas hijas */}
      <Outlet />
    </div>
  );
}

export default Layout;
