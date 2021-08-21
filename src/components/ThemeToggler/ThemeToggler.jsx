import React, { useContext } from 'react'
import { Theme } from '../../context/ThemeContext'

const ThemeToggler = ({ children }) => {
  const { darkTheme, toggleTheme } = useContext(Theme)

  return (
    <>
      <div className="themeToggleContainer">
        <span> Tema activado <i>{darkTheme ? 'Oscuro' : 'Claro'}</i></span>
        <button onClick={toggleTheme}>Activar tema  {darkTheme ? ' claro' : ' oscuro'}</button>
      </div>

      <div className={`themedApp ${darkTheme ? 'darkThemed' : 'lightThemed'}`}>
        {children}
      </div>
    </>
  )
}

export default ThemeToggler