interface ConfirmacionProps {
  mensaje: string;
  handleConfirm: (confirm: boolean) => void; // Retornar el valor bool al componente Padre que esta llamando este componente
}

function Confirmacion({ mensaje, handleConfirm }: ConfirmacionProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold">{mensaje}</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleConfirm(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Sí
            </button>
            <button
              onClick={() => handleConfirm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmacion;
