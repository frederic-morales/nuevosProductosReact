function Confirmacion({ mensaje, handleConfirm, onSubmit }) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          handleConfirm(true);
        }}
        className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold">{mensaje}</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Sí
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={() => handleConfirm(false)}
            >
              No
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Confirmacion;
