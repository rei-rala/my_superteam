import React, { createContext, useState } from 'react';

export const Theme = createContext();

export const ThemeContext = ({ children }) => {

  const [darkTheme, setDarkTheme] = useState(false)
  const toggleTheme = () => setDarkTheme(!darkTheme)

  return <Theme.Provider value={{ darkTheme, toggleTheme }}> {children} </Theme.Provider>;
}