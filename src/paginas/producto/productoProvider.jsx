// context/ProductoContext.jsx
import { createContext, useContext, useState } from "react";
import fetchProducto from "../../hooks/fetch_producto";

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState(() => {
    const storedProductos = sessionStorage.getItem("productos");
    return storedProductos ? JSON.parse(storedProductos) : {};
  });

  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const obtenerProducto = async (productoId) => {
    if (productos[productoId]) return productos[productoId]; // Si ya está en caché, no hacer fetch

    setLoading((prev) => ({ ...prev, [productoId]: true }));
    const data = await fetchProducto({ productoId }); // Llamamos al hook
    setLoading((prev) => ({ ...prev, [productoId]: false }));

    if (data.error) {
      setError(data.error);
      return null;
    }

    setProductos((prev) => {
      const newProductos = { ...prev, [productoId]: data };
      sessionStorage.setItem("productos", JSON.stringify(newProductos)); // Guardar en sessionStorage
      return newProductos;
    });
    return data;
  };

  return (
    <ProductoContext.Provider
      value={{ productos, obtenerProducto, loading, error }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export const useProducto = () => useContext(ProductoContext);
