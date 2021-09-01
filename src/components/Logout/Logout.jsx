import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';

import { SuperTeamManager } from '../../context/SuperTeamManagerContext'

const LogOut = ({ aditionalOnClick = () => { } }) => {
  const { setUserLogged, usernameLogged, setUsernameLogged, shortUsernameLogged, setShortUsernameLogged,
    setAreCredsValid } = useContext(UserLogged)
  const { setSuperTeam } = useContext(SuperTeamManager)

  const loggingOut = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (window.confirm(`Desea cerrar la sesion de ${usernameLogged}?`)) {
      localStorage.removeItem('superteam_token')
      localStorage.removeItem('superteam_email')
      setUserLogged(false)
      setAreCredsValid(false)
      setUsernameLogged(null)
      setShortUsernameLogged(null)
      setSuperTeam([])
      aditionalOnClick()
    }
  }

  return (
    <div className='userboard' title={`Sesion de ${usernameLogged}`}>
      <p>{shortUsernameLogged}</p>
      <button onClick={loggingOut}>Cerrar Sesion</button>
    </div>
  )
}

export default LogOut