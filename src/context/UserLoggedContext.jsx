import React, { createContext, useState } from 'react';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const manageUserLogged = (bool) => {
    setIsUserLogged(bool)
  };


  return <UserLogged.Provider value={{ isUserLogged, manageUserLogged }}> {children} </UserLogged.Provider>;
}