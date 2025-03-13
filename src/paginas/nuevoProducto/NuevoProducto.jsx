import { useState, useMemo, useEffect } from "react";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "./Campo";
import CheckEtapa from "../../componentes/CheckEtapa";
import axios from "axios";

function NuevoProducto() {
  //Campos a renderizar
  const [camposPrueba, setCamposPrueba] = useState({
    nombre: "",
    descripcion: "",
    informacion: "",
    camp01: "",
  });
  const [error, setError] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState();
  const [etapas, setEtapas] = useState();
  const [campos, setCampos] = useState();

  // Función para hacer la solicitud con Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/etapa/getAll");
        setEtapas(response.data); // Axios ya parsea la respuesta a JSON
        const [etapasResponse, camposResponse] = await Promise.all([
          axios.get("http://localhost:3000/etapa/getAll"),
          axios.get("http://localhost:3000/producto/getColumns"),
        ]);

        setEtapas(etapasResponse.data);
        setCampos(camposResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error");
      }
    };

    fetchData();
  }, []);

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState();

  const camposLlenos = useMemo(() => {
    return Object.values(camposPrueba).every((valor) => valor.trim() !== ""); //verifica que un campo no este vacio
  }, [camposPrueba]); //Se ejecuta cada vez que "campos" cambia, osea cada vez que el usuario cambia el valor en un campo

  const handleChange = (campoId, valor) => {
    setCamposPrueba((prev) => ({
      ...prev, // prev obiente el ultimo estado de campos
      [campoId]: valor, // se actualiza solo el campo seleccionado
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(campos);

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-12 ">
      <h2 className="text-xl font-black md:text-2xl lg:text-4xl text-white uppercase drop-shadow-[1px_2px_0px_black]">
        Nuevo Producto
      </h2>
      <form className="w-full mt-10 h-full">
        {/* Campos */}
        <div className="w-full flex gap-4 justify-center flex-wrap">
          {Object.keys(camposPrueba).map((campoId) => (
            <Campo
              key={campoId}
              keyName={campoId}
              valor={camposPrueba[campoId]}
              onChange={(valor) => handleChange(campoId, valor)} // valor es el texto ingresado por el usuario
              hasError={camposPrueba[campoId].trim() === ""} //Verificamos si el campo esta vacio
            />
          ))}
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mb-8 mt-12 md:mt-16 flex flex-col items-center">
          <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Etapas que llevara el producto
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full">
            {typeof etapas != "undefined" &&
              etapas.map((etapa) => (
                <CheckEtapa key={etapa.EtapaId} Nombre={etapa.Nombre} />
              ))}
          </div>
        </div>
        {/* Boton */}
        {camposLlenos && (
          <div className="w-full pt-12 flex justify-center">
            <div className="w-full max-w-sm">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setMostrarConfirmacion(true)}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </form>
      {mostrarConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de realizar esta accion?"
          handleConfirm={(value) => {
            setDatosConfirmados(value);
            setMostrarConfirmacion(false);
          }}
        />
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y cancele la accion
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción"
        ></Alert>
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y confirme la accion
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/"
          mensaje="Se ha iniciado un nuevo desarrollo"
        ></Alert>
      )}
    </div>
  );
}

export default NuevoProducto;
