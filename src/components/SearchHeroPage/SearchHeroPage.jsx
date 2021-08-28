import React, { useContext, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import SearchHero from './SearchHero/SearchHero'
import SearchResults from './SearchResults/SearchResults'


import './searchHero.scss'

const SearchHeroPage = () => {
  const { isUserLogged } = useContext(UserLogged)
  const [gettingInfo, setGettingInfo] = useState(false)
  const [herosFound, setHerosFound] = useState([])

  return (
    <section className='searchHero'>
      {
        isUserLogged
          ? <>
            <SearchHero setGettingInfo={setGettingInfo} herosFound={herosFound} setHerosFound={setHerosFound} />
            <SearchResults gettingInfo={gettingInfo} herosFound={herosFound} />
          </>
          : null
      }
    </section>

  )
}

export default SearchHeroPage