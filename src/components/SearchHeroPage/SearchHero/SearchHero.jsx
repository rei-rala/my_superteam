import React, { useContext, useState } from 'react'
import { UserLogged } from '../../../context/UserLoggedContext'
import { SuperTeamManager } from '../../../context/SuperTeamManagerContext'

import './searchHero.scss'

const SearchHero = ({ gettingInfo, manageGettingInfo }) => {
  const { isUserLogged } = useContext(UserLogged)
  const { superTeam, addHero, removeHero } = useContext(SuperTeamManager)



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
    else {
      seek = tgt.value
    }

    if (seek.length > 2 || tgt.tagname === 'INPUT') {
      manageGettingInfo(true)
      const axios = require('axios').default

      await axios.get(`https://superheroapi.com/api.php/547377806383395/search/${seek}`)
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'error') {
            manageHerosFound({
              error: true
            })
          }
          else {
            manageHerosFound(data)
          }
          console.log(data)
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
                        (herosFound.results).map((h, index) => (
                          <div className="heroCard" key={index} title={h.name} draggable>
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
                                      Object.keys(h.powerstats).map((s, index) => <li key={index + h.id}> <span>{s}</span> <span>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
                                    }
                                  </ul>
                                </div>

                              </div>
                            </div>
                            <div className="heroCardActions">
                              {
                                superTeam.map(heroInTeam => heroInTeam.id).includes(h.id)
                                  ? <button onClick={() => removeHero(h)} title={`Quitar ${h.name} de equipo`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                  </button>
                                  : <button onClick={() => addHero(h)} title={`Agregar ${h.name} a equipo`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-down-right" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5z" />
                                      <path fillRule="evenodd" d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0v5z" />
                                    </svg>
                                  </button>
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