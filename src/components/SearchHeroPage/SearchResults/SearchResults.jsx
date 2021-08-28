import React, { useContext } from 'react'

import { SuperTeamManager } from '../../../context/SuperTeamManagerContext'

import HeroOptionsBtn from '../SearchHero/HeroOptionsBtn/HeroOptionsBtn'

const SearchResults = ({ gettingInfo, herosFound }) => {
  const { superTeam, checkMaxTeam, checkAlignment, checkMaxByAlignment, addHero, removeHero } = useContext(SuperTeamManager)


  return (
    <div className='foundContainer'>
      {
        herosFound && herosFound.response === 'success'
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
                              Object.keys(h.powerstats).map((s) => <li key={`PS-${s}-${h.id}`}> <span className='powerStatName'>{s}</span> <span className='powerStatValue'>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
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
            ? 'No hay resultado que cumpla con su termino de busqueda'
            : null
      }
    </div>
  )
}


export default SearchResults