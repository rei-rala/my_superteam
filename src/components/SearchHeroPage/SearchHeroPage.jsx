import React, { useContext, useEffect, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import SearchHero from './SearchHero/SearchHero'
import SearchResults from './SearchResults/SearchResults'
import SortButton from '../SortButton/SortButton'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'
import { HoldSearch } from '../../context/HoldSearchContext'
import Loading from '../Loading/Loading'
import { ManageFirestore } from '../../context/ManageFirestore'


const SearchHeroPage = () => {
  const { results, setResults } = useContext(HoldSearch)
  const { heroSortingTerms, setHeroSortingTerms } = useContext(SuperTeamManager)
  const { updatingFB } = useContext(ManageFirestore)

  const { isUserLogged } = useContext(UserLogged)
  const [gettingInfo, setGettingInfo] = useState(false)


  const [refreshBySort, setRefreshBySort] = useState(0)
  const toggleRefresh = () => setRefreshBySort(refreshBySort + 1)

  useEffect(() => {

    if (results?.length > 1) {

      const firstHeroStats = results[0] ? Object.keys((results[0]).powerstats).map(s => `powerstats.${s}`) : undefined
      const customSortingTerms = firstHeroStats ? ['name', 'biography.alignment', ...firstHeroStats] : undefined
      customSortingTerms && setHeroSortingTerms(customSortingTerms)
    }

  }, [results, setHeroSortingTerms])


  return (
    <section className='searchHero'>
      {
        isUserLogged
          ? <>
            <SearchHero setGettingInfo={setGettingInfo} results={results} setResults={setResults} />
            {
              updatingFB
                ? <Loading />
                : null
            }
            {
              gettingInfo
                ? <Loading />
                : < div className="control">
                  {
                    results?.length > 1 && heroSortingTerms && <SortButton toSort={results} displayFunction={setResults} arraySortingTerms={heroSortingTerms} varUseEffect={toggleRefresh} />
                  }
                  <SearchResults results={results} />
                </div>
            }
          </>
          : null
      }

    </section >

  )
}

export default SearchHeroPage