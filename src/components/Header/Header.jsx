import React, { useContext } from 'react'
import './header.scss'

import { NavLink } from 'react-router-dom';

import LogOut from '../Logout/Logout';
import { UserLogged } from '../../context/UserLoggedContext';

const Header = () => {
  const { isUserLogged } = useContext(UserLogged)

  return (
    <header className='header'>
      <NavLink to='/'>
        <div className="logo">Super/Team</div>
      </NavLink>
      {
        isUserLogged
          ? <div className="navegacion">
            <nav className="nav">
              <ul className="navOptions">
                <li className="navOptionSection">
                  <NavLink to='/test'>
                    TEST
                  </NavLink>
                </li>
                <li className="navOptionSection">
                  <NavLink to='/home'>
                    Equipo
                  </NavLink>
                </li>
                <li className="navOptionSection">
                  <NavLink to='/search'>
                    Busqueda de heroes
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="logOut">
              <LogOut />
            </div>
          </div>
          : null
      }
    </header>

  )
}

export default Header