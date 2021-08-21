import React, { createContext, useState } from 'react';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const manageUserLogged = (bool) => setIsUserLogged(bool);

  const [usernameLogged, setUsernameLogged] = useState('')
  const manageUsernameLogged = (username) => setUsernameLogged(username)

  return <UserLogged.Provider value={{ isUserLogged, manageUserLogged, usernameLogged, manageUsernameLogged }}> {children} </UserLogged.Provider>;
}