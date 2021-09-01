import React, { useEffect, useState } from 'react'

import './searchResults.scss'
import HeroCard from './HeroCard/HeroCard'

const SearchResults = ({ herosFound, results }) => {

  const [easyModeActive, setEasyModeActive] = useState(false)

  const manageEasyMode = () => {
    localStorage.setItem('superteam_easymode', !easyModeActive)
    setEasyModeActive(!easyModeActive)
  }

  useEffect(() => {
    JSON.parse(localStorage.getItem('superteam_easymode')) && setEasyModeActive(JSON.parse(localStorage.getItem('superteam_easymode')))
  }, [])


  return (
    <div className={`foundContainer ${easyModeActive ? 'easyHover' : ''}`}>
      {
        results?.length
          ? <>
            <div className="infoSwitch">
              <button onClick={manageEasyMode} title={`Click para ${easyModeActive ? 'dejar de ' : ''}ver los powerstats del heroe al posicionarse sobre su imagen`}>
                <span>Hover</span>
                {
                  easyModeActive
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-on" viewBox="0 0 16 16">
                      <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-off" viewBox="0 0 16 16">
                      <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
                    </svg>
                }
              </button>
            </div>
            <h5>{results?.length} {results?.length > 1 ? 'resultados' : 'resultado'}</h5>
            <div className={'cardsContainer'}>
              {
                results?.map((h, index) => <HeroCard key={'index' + index} hero={h} />)
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