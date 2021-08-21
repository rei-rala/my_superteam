import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';

const LogOut = () => {
  const { manageUserLogged, usernameLogged, manageUsernameLogged } = useContext(UserLogged)

  const loggingOut = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    localStorage.removeItem('superteam_access')
    localStorage.removeItem('superteam_email')
    manageUserLogged(false)
    manageUsernameLogged('')
  }

  return (
    <div className='userboard'>
      <span>{usernameLogged}</span>
      <button onClick={loggingOut}>Cerrar Sesion</button>
    </div>
  )
}

export default LogOut