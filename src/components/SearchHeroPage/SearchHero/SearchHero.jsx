import React, { useState } from 'react'


const SearchHero = ({ gettingInfo, setGettingInfo, setHerosFound }) => {

  const [searchMenuActive, setSearchMenuActive] = useState(true)
  const toggleSearchMenu = (e) => {
    e.preventDefault()
    setSearchMenuActive(!searchMenuActive)
  }

  const searchHero = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation();
    const tgt = ev.target

    let seek;

    if (tgt.tagName === 'FORM') {
      seek = tgt.seekHero.value
    }
    else if (tgt.tagName === 'INPUT') {
      seek = tgt.value
    }

    seek = seek.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

    if (((tgt.tagname === 'FORM' || seek.length > 1) || tgt.tagname === 'INPUT')) {
      setGettingInfo(true)
      const axios = require('axios').default

      await axios.get(`https://superheroapi.com/api.php/547377806383395/search/${seek}`)
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'error') {
            setHerosFound({ error: true })
          }
          else {
            setHerosFound(data)
          }
          return data
        })
        .finally(() => setGettingInfo(false))
    }
  }


  return (
    <form onSubmit={searchHero} className={searchMenuActive ? 'searchMenuOn' : 'searchMenuOff'}>
      <label htmlFor='heroSearchInput'>Nombre de heroe</label>
      <input onChange={searchHero} type="text" id='heroSearchInput' name='seekHero' maxLength={15} placeholder='Ingrese busqueda' required />
      <div className="searchOptions">
        {gettingInfo ? <button className='workingButton'> Cargando</ button > : <button> Busqueda</ button >}
        <button onClick={toggleSearchMenu} className='hideSearchMenu'> Ocultar</ button >
        <button onClick={toggleSearchMenu} className='showSearchMenu'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </form >
  )
}

export default SearchHero