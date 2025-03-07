interface ButtonProps {
  text: string;
  estado?: number;
  setEstado?: (etapa: number) => void;
  classCSS: string;
}

function Button({ text, estado, setEstado, classCSS }: ButtonProps) {
  return (
    <button
      onClick={() => {
        if (setEstado && estado) {
          setEstado(estado);
        }
      }}
      className={`text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit 
              border-2 shadow-sm ${classCSS}`}
    >
      {text}
    </button>
  );
}

export default Button;
