import React, { useContext, useState } from 'react'
import './header.scss'

import { NavLink } from 'react-router-dom';
import MenuMobileButton from './MenuMobileButton/MenuMobileButton';
import MenuMobileActive from './MenuMobileButton/MenuMobileActive/MenuMobileActive'

import LogOut from '../Logout/Logout';
import { UserLogged } from '../../context/UserLoggedContext';

const Header = () => {
  const { isUserLogged } = useContext(UserLogged)

  const [activeMenuMobile, setActiveMenuMobile] = useState(false)
  const toggleMenuMobile = () => setActiveMenuMobile(!activeMenuMobile)

  return (
    <>
      <header className={`header ${!isUserLogged ? 'homeUnique' : ''}`}>
        <NavLink exact to='/home' activeClassName='currentNav' className='logoLink' >
          <div className="logo">Super<span className='logo'>/</span>Team</div>
        </NavLink>
        {
          isUserLogged
            ? <div className="navegacion">
              <nav className="nav">
                <ul className='navOptions'>
                  <li className='navOptionSection'>
                    <NavLink to='/home' activeClassName='currentNav'>
                      Equipo
                    </NavLink>
                  </li>
                  <li className="navOptionSection">
                    <NavLink to='/search' activeClassName='currentNav'>
                      Busqueda de heroes
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <div className="logOut">
                <LogOut />
              </div>
              <MenuMobileButton activeMenuMobile={activeMenuMobile} toggleMenuMobile={() => toggleMenuMobile()} />
            </div>
            : null
        }
      </header>
      {
        isUserLogged
          ? <MenuMobileActive activeMenuMobile={activeMenuMobile} toggleMenuMobile={() => toggleMenuMobile()} />
          : null
      }
    </>
  )
}

export default Header