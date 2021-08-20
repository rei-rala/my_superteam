import React, { useContext } from 'react'
import { UserLogged } from '../../../context/UserLoggedContext'

const SearchHero = ({ gettingInfo, manageGettingInfo }) => {
  const { isUserLogged } = useContext(UserLogged)


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

    if (seek.length > 3 || tgt.tagname === 'INPUT') {
      manageGettingInfo(true)
      const axios = require('axios').default

      await axios.get(`https://superheroapi.com/api.php/547377806383395/search/${seek}`)
        .then(r => (r.data))
        .then(data => {
          console.log(data)
        })
        .finally(() => manageGettingInfo(false))
    }
  }



  return (
    <section>
      {
        isUserLogged
          ? <form onSubmit={searchHero}>

            < div className="group" >
              <label htmlFor='heroSearchInput'>Busqueda</label>
              <input onChange={searchHero} type="text" id='heroSearchInput' name='seekHero' required />
            </div >

            <button > Obtener</ button >
          </form >
          : null
      }
    </section>
  )
}

export default SearchHero