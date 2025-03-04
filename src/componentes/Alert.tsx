import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AlertProps {
  duracion: number;
  redirigir?: string;
  bgColor: string;
  mensaje: string;
  handleMostrar?: (valor: boolean) => void;
}

function Alert({
  duracion = 3000,
  bgColor,
  redirigir,
  mensaje,
  handleMostrar,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const rutaNueva = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (handleMostrar) handleMostrar(false); // If por si no se
      if (redirigir) {
        rutaNueva(redirigir);
      }
    }, duracion);

    return () => clearTimeout(timer); // Limpieza al desmontar
  }, [duracion, rutaNueva, redirigir, handleMostrar]);

  // handleMostrar(isVisible);
  return isVisible ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 opacity-[95%]">
      <div
        className={`${bgColor} opacity-none p-6 rounded-lg shadow-lg text-center`}
      >
        <p className="text-lg font-semibold">{mensaje}</p>
      </div>
    </div>
  ) : null;
}

export default Alert;
