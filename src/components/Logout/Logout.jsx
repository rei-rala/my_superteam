import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';

const LogOut = () => {
  const { manageUserLogged, usernameLogged, manageUsernameLogged } = useContext(UserLogged)


  const loggingOut = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (window.confirm(`Desea cerrar la sesion de ${usernameLogged}?`)) {
      localStorage.removeItem('superteam_access')
      localStorage.removeItem('superteam_email')
      manageUserLogged(false)
      manageUsernameLogged('')
    }
  }

  return (
    <div className='userboard'>
      <span>{usernameLogged.toUpperCase()}</span>
      <button onClick={loggingOut}>Cerrar Sesion</button>
    </div>
  )
}

export default LogOut