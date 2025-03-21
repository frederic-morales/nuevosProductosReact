function Campo({ valor, keyName, onChange, hasError, placeholder }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0 text-white ">
      <label
        className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-xl drop-shadow-[1px_1px_1px_black]"
        htmlFor="nombreProducto"
      >
        {keyName}
      </label>
      <input
        className={`w-full bg-gray-50 text-black focus:bg-blue-50 rounded py-3 px-4 mb-3 focus:outline-none focus:shadow-xl focus:shadow-blue-300 ${
          placeholder && "placeholder:text-black"
        }`}
        id="nombreProducto"
        type="text"
        placeholder={`${
          placeholder ? placeholder : "Ingrese el nombre del producto"
        }`}
        value={valor}
        onChange={handleChange}
      />
      {/* Solo se mostrará si el campo esta vacio */}
      {hasError && (
        <p className="text-[#ff247f] text-xs font-bold md:text-sm drop-shadow-[0px_1px_0x_black]">
          Campo Obligatorio
        </p>
      )}
    </div>
  );
}

export default Campo;
