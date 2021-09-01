import React, { useContext, useEffect, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'
import { Link } from 'react-router-dom'


import './homePage.scss'
import TeamPowerStatInfo from './TeamPowerStatInfo/TeamPowerStatInfo'
import SortButton from '../SortButton/SortButton'

import HeroTeamCard from './HeroTeamCard/HeroTeamCard'
import { ManageFirestore } from '../../context/ManageFirestore'

const HomePage = () => {

  const { superTeam, manageSuperTeam, removeHero, heroSortingTerms, totalPowerStats, averagePowerStats, heroAvgHeightWeight } = useContext(SuperTeamManager)
  const { isUserLogged, usernameLogged } = useContext(UserLogged)
  const { setForceUpdate } = useContext(ManageFirestore)

  const [updateOnce, setUpdateOnce] = useState(true)

  const { height, weight } = heroAvgHeightWeight

  const [refreshesBySort, setRefreshesBySort] = useState(0);
  const toggleRefresh = () => setRefreshesBySort(refreshesBySort + 1)

  useEffect(() => {
    isUserLogged && updateOnce && setForceUpdate(true) && setUpdateOnce(false)
  }, [isUserLogged, updateOnce, setForceUpdate])

  return (
    <section className="home">
      {
        isUserLogged
          ? <>
            <h2>SuperTeam de {usernameLogged}</h2>
            {
              superTeam.length && averagePowerStats
                ? <>
                  <div className="resumeSection">
                    {
                      Object.keys(averagePowerStats).map(APS => <TeamPowerStatInfo
                        key={'div' + APS}
                        className='statImg'
                        powerStat={APS}
                        powerStatAverage={averagePowerStats[APS]}
                        powerStatTotal={totalPowerStats[APS]}
                      />
                      )
                    }
                  </div>
                  <div className="heightAndWeight">
                    <h5>Otros aspectos promedios</h5>
                    <hr />
                    <p>
                      <span> Altura</span>
                      <span>{height} cms</span>
                    </p>
                    <p>
                      <span> Peso</span>
                      <span>{weight} kg</span>
                    </p>
                  </div>
                  <div className="mySuperTeam">
                    <SortButton toSort={superTeam} displayFunction={manageSuperTeam} varUseEffect={toggleRefresh} arraySortingTerms={heroSortingTerms} />
                    {
                      superTeam.map(h => <HeroTeamCard
                        key={'myHero' + h.id}
                        hero={h}
                        removeHeroAction={() => removeHero(h)}
                      />
                      )
                    }
                  </div>

                </>
                : <div className="noTeamContainer">
                  <h4>¡No tienes un equipo activo!</h4>
                  <p>Para agregar heroes a tu equipo, puedes hacer click</p>
                  <Link to='/search'><button>Aqui</button></Link>
                </div>
            }
          </>
          : 'ERROR'
      }
    </section >
  )
}

export default HomePage