import React, { useContext, useEffect, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import SearchHero from './SearchHero/SearchHero'
import SearchResults from './SearchResults/SearchResults'
import SortButton from '../SortButton/SortButton'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'
import { HoldSearch } from '../../context/HoldSearchContext'
import Loading from '../Loading/Loading'


const SearchHeroPage = () => {
  const { herosFound, setHerosFound, results, setResults } = useContext(HoldSearch)

  const { isUserLogged } = useContext(UserLogged)
  const { heroSortingTerms, setHeroSortingTerms } = useContext(SuperTeamManager)
  const [gettingInfo, setGettingInfo] = useState(false)


  const [refreshBySort, setRefreshBySort] = useState(0)
  const toggleRefresh = () => setRefreshBySort(refreshBySort + 1)

  useEffect(() => {

    if (herosFound?.results?.length > 1) {

      const firstHeroStats = Object.keys((herosFound.results[0]).powerstats).map(s => `powerstats.${s}`)
      const customSortingTerms = ['name', 'biography.alignment', ...firstHeroStats]
      setHeroSortingTerms(customSortingTerms)
    }

  }, [herosFound, setHeroSortingTerms])


  return (
    <section className='searchHero'>
      {
        isUserLogged
          ? <>
            <SearchHero setGettingInfo={setGettingInfo} setHerosFound={setHerosFound} results={results} setResults={setResults} />
            {
              gettingInfo
                ? <Loading />
                : < div className="control">
                  {
                    herosFound?.results?.length > 1 && heroSortingTerms && <SortButton toSort={herosFound.results} displayFunction={setResults} arraySortingTerms={heroSortingTerms} varUseEffect={toggleRefresh} />
                  }
                  <SearchResults herosFound={herosFound} results={results} />
                </div>
            }
          </>
          : null
      }

    </section >

  )
}

export default SearchHeroPage