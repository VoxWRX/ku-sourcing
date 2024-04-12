"use client"

import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <GlobalContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </GlobalContext.Provider>
  );
};
