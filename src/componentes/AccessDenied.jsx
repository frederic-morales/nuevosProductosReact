import { useNavigate } from "react-router-dom";

const AccessDenied = ({ title, message }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-20 flex flex-col items-center text-center mx-auto p-6 shadow-2xl rounded-2xl ">
      <h2 className="text-xl md:text-3xl font-bold text-white uppercase drop-shadow-[1px_1px_0px_black]">
        {title}
      </h2>
      <p className="mt-2 md:text-lg text-white font-bold uppercase drop-shadow-[1px_1px_0px_black]">
        {message}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="w-2/4 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default AccessDenied;
