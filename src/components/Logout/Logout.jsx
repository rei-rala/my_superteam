import React, { useContext, useEffect } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';

const LogOut = () => {
  const { manageUserLogged } = useContext(UserLogged)

  const loggingOut = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    localStorage.removeItem('superteam_access')
    manageUserLogged(false)
  }
  useEffect(() => {
    return
  }, [])

  return (
    <button onClick={loggingOut}>Cerrar Sesion</button>
  )
}

export default LogOut