import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [googleID, setGoogleID] = useState('');

  const updateGoogleID = (newGoogleID) => {
    setGoogleID(newGoogleID);
  };

  return (
    <GlobalContext.Provider value={{ googleID, updateGoogleID }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
