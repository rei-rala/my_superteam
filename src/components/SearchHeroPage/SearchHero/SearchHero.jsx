import React, { useContext, useState } from 'react'
import { UserLogged } from '../../../context/UserLoggedContext'
import { SuperTeamManager } from '../../../context/SuperTeamManagerContext'

import HeroOptionsBtn from './HeroOptionsBtn/HeroOptionsBtn'
import './searchHero.scss'

const SearchHero = ({ gettingInfo, manageGettingInfo }) => {
  const { isUserLogged } = useContext(UserLogged)
  const { superTeam, checkMaxTeam, checkAlignment, checkMaxByAlignment, addHero, removeHero } = useContext(SuperTeamManager)

  const [herosFound, setHerosFound] = useState([])
  const manageHerosFound = (arr) => setHerosFound(arr)

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
      manageGettingInfo(true)
      const axios = require('axios').default

      await axios.get(`https://superheroapi.com/api.php/547377806383395/search/${seek}`)
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'error') {
            manageHerosFound({ error: true })
          }
          else {
            manageHerosFound(data)
          }
          return data
        })
        .finally(() => manageGettingInfo(false))
    }
  }




  return (
    <section className='searchHero'>
      {
        isUserLogged
          ? <>
            <form onSubmit={searchHero} className={searchMenuActive ? 'searchMenuOn' : 'searchMenuOff'}>
              <label htmlFor='heroSearchInput'>Nombre de heroe</label>
              <input onChange={searchHero} type="text" id='heroSearchInput' name='seekHero' maxLength={15} required />
              <div className="searchOptions">
                {gettingInfo ? <button className='workingButton'> Cargando</ button > : <button> Busqueda</ button >}
                {herosFound.response === 'success' ? <button onClick={toggleSearchMenu} className='hideSearchMenu'> Ocultar</ button > : null}
                <button onClick={toggleSearchMenu} className='showSearchMenu'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </form >

            <div className='foundContainer'>
              {
                herosFound.response === 'success'
                  ? <>
                    <div className="loadingContainer">
                      {
                        gettingInfo
                          ? 'Cargando'
                          : null
                      }
                    </div>
                    <h6>Busqueda: {herosFound['results-for'].toUpperCase()} - {herosFound.results.length} {herosFound.results.length > 1 ? 'resultados' : 'resultado'}</h6>
                    <div className="cardsContainer">
                      {
                        (herosFound.results).map(h => (
                          <div className={`heroCard ${h.biography.alignment === 'bad' ? 'badHero' : 'goodHero'}`} key={h.id} title={h.name} draggable>
                            {/* {h.id} */}
                            <strong>{h.name}</strong>
                            <div className='flip-card'>
                              <div className="flip-card-inner">
                                <div className="flip-card-front">
                                  <img src={h.image.url} alt={h.name} draggable='false' />
                                </div>

                                <div className="flip-card-back">
                                  <ul>
                                    {
                                      Object.keys(h.powerstats).map((s, index) => <li key={index + h.id}> <span className='powerStatName'>{s}</span> <span className='powerStatValue'>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
                                    }
                                  </ul>
                                </div>

                              </div>
                            </div>
                            <div className="heroCardActions">
                              {
                                superTeam.map(heroInTeam => heroInTeam.id).includes(h.id)
                                  ? <HeroOptionsBtn type='remove' onClick={() => removeHero(h)} title={`Quitar ${h.name} de equipo`} />
                                  : checkMaxTeam()
                                    ? <HeroOptionsBtn title={`Tu equipo esta completo`} />
                                    : checkMaxByAlignment(h)
                                      ? <HeroOptionsBtn title={`Tu equipo alcanzo el tope para heroes con orientacion ${checkAlignment(h) === 'good' ? 'buena' : 'mala'}`} />
                                      : <HeroOptionsBtn type='add' onClick={() => addHero(h)} title={`Agregar ${h.name} a equipo`} />
                              }
                            </div>
                          </div>))
                      }
                    </div>
                  </>
                  : herosFound?.error
                    ? 'No hay resultados que cumplan con su busqueda'
                    : null
              }
            </div>

          </>
          : null
      }
    </section>
  )
}

export default SearchHero