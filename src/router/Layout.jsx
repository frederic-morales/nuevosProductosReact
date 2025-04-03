import { Outlet } from "react-router-dom";
import Header from "../componentes/Header";
import ProtectedRouteGeneral from "../auth/ProtectedRouteGeneral";

function Layout() {
  return (
    <ProtectedRouteGeneral>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(40, 40, 40, 0.5), rgba(60, 60, 60, 0.5)),  url("https://images.unsplash.com/photo-1579165466991-467135ad3110?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFib3JhdG9yaW98ZW58MHx8MHx8fDA%3D")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-screen-xl mx-auto px-5 pt-5 pb-12">
          <Header></Header>{" "}
          {/*Componente Header se renderizará en todas las paginas y rutas*/}
          <Outlet />
        </div>
      </div>
    </ProtectedRouteGeneral>
  );
}

export default Layout;
