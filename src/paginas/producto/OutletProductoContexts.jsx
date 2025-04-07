import { createContext, useContext } from "react";
export const OutletDataContext = createContext(null);
export const useOutletData = () => useContext(OutletDataContext);
