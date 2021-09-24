import React, { createContext, useState } from 'react';

export const HoldSearch = createContext();

export const HoldSearchContext = ({ children }) => {


  const [results, setResults] = useState([])

  return <HoldSearch.Provider value={{  results, setResults }}> {children} </HoldSearch.Provider>;
}