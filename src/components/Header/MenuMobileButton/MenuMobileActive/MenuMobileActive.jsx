import React from 'react'

import { NavLink } from 'react-router-dom'
import Logout from '../../../Logout/Logout'

const MenuMobileActive = ({ activeMenuMobile, toggleMenuMobile }) => {
  return (
    <div className={`navegacionMobile ${activeMenuMobile ? 'active' : 'notActive'}`}>
      <nav className="navMobile">
        <ul className="navOptionsMobile">
          <li className="navOptionSectionMobile">
            <NavLink to='/home' activeClassName='currentNav' onClick={toggleMenuMobile}>
              Equipo
            </NavLink>
          </li>
          <li className="navOptionSectionMobile">
            <NavLink to='/search' activeClassName='currentNav' onClick={toggleMenuMobile}>
              Busqueda de heroes
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Logout />

    </div>
  )
}

export default MenuMobileActive