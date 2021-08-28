import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';

const LogOut = () => {
  const { setUserLogged, usernameLogged, setUsernameLogged, shortUsernameLogged, setShortUsernameLogged } = useContext(UserLogged)


  const loggingOut = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (window.confirm(`Desea cerrar la sesion de ${usernameLogged}?`)) {
      localStorage.removeItem('superteam_access')
      localStorage.removeItem('superteam_email')
      setUserLogged(false)
      setUsernameLogged('')
      setShortUsernameLogged('')
    }
  }

  return (
    <div className='userboard' title={`Sesion de ${usernameLogged}`}>
      <span>{shortUsernameLogged}</span>
      <button onClick={loggingOut}>Cerrar Sesion</button>
    </div>
  )
}

export default LogOut