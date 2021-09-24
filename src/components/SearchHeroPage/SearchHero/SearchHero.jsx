import React, {  useState } from 'react'

import './searchHero.scss'

const SearchHero = ({ gettingInfo, setGettingInfo, results, setResults }) => {
  const [searchMenuActive, setSearchMenuActive] = useState(true)
  const toggleSearchMenu = (e) => {
    e.preventDefault()
    setSearchMenuActive(!searchMenuActive)
  }



  const axios = require('axios').default
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const searchHero = async (ev) => {
    ev.preventDefault()

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

      await axios.get(`https://superheroapi.com/api.php/${process.env.REACT_APP_SUPERHEROAPIKEY}/search/${seek}`, {
        cancelToken: source.token
      })
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'success') {
            setResults(data.results)
          }
          else {
            setResults([])
          }
        })
        .catch(console.log)
        .finally(() => setGettingInfo(false))
    }
  }

  // No consegui cancelar el get
  /*   useEffect(() => {
      return () => {
        source.cancel('Operation canceled by the user.')
      }
    }, [source]) */


  return (
    <form onSubmit={searchHero} className={searchMenuActive ? 'searchMenuOn' : 'searchMenuOff'}>
      <label htmlFor='heroSearchInput'>Nombre de heroe</label>
      <input onChange={searchHero} type="text" id='heroSearchInput' name='seekHero' minLength={2} maxLength={15} placeholder='Ingrese busqueda' required />
      <div className="searchOptions">
        {gettingInfo ? <button className='workingButton'> Cargando</ button > : <button> Busqueda</ button >}
        {results?.length > 0 && <button onClick={toggleSearchMenu} className='hideSearchMenu'> Ocultar</ button >}
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