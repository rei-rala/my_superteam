import React from 'react'
import './menuMobileButton.scss'

const MenuMobileButton = ({ activeMenuMobile, toggleMenuMobile }) => {

  return (
    <button className={`menuMobileBtn + ${(activeMenuMobile ? 'activeMenu' : '')}`} onClick={toggleMenuMobile}>
      <div></div>
      <div></div>
      <div></div>
    </button>

  )
}

export default MenuMobileButton