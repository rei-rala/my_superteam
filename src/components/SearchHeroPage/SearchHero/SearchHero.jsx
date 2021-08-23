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

    if ((tgt.tagname === 'FORM' || seek.length > 1) || tgt.tagname === 'INPUT') {
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
            <form onSubmit={searchHero}>
              <label htmlFor='heroSearchInput'>Busqueda</label>
              <input onChange={searchHero} type="text" id='heroSearchInput' name='seekHero' required />
              <button > Obtener</ button >
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
                                  : checkMaxByAlignment(h)
                                    ? <HeroOptionsBtn title={`Equipo alcanzo el tope para heroes con orientacion ${checkAlignment(h) === 'good' ? 'buena' : 'mala'}`} />
                                    : checkMaxTeam()
                                      ? <HeroOptionsBtn title={`Equipo completo'}`} />
                                      : <HeroOptionsBtn type='add' onClick={() => addHero(h)} title={`Agregar ${h.name} a equipo`} />
                              }
                            </div>
                          </div>)
                        )
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