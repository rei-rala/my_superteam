import React, {  useState } from 'react'
import SearchHero from './SearchHero/SearchHero'

const SearchHeroPage = () => {

  const [gettingInfo, setGettingInfo] = useState(false)
  const manageGettingInfo = (bool) => setGettingInfo(bool)

  return (
    <>
      <SearchHero gettingInfo={gettingInfo} manageGettingInfo={manageGettingInfo} />

    </>
  )
}

export default SearchHeroPage