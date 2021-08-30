import React, { createContext, useState } from 'react';

export const HoldSearch = createContext();

export const HoldSearchContext = ({ children }) => {


  const [herosFound, setHerosFound] = useState([])
  const [results, setResults] = useState([])

  return <HoldSearch.Provider value={{ herosFound, setHerosFound, results, setResults }}> {children} </HoldSearch.Provider>;
}