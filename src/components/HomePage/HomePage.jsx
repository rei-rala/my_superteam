import React, { useContext, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'


import './homePage.scss'
import PowerStatImg from './PowerStatImg/PowerStatImg'
import SortButton from '../SortButton/SortButton'
import { Link } from 'react-router-dom'


const HomePage = () => {

  const { superTeam, manageSuperTeam, removeHero, heroSortingTerms, totalPowerStats, averagePowerStats } = useContext(SuperTeamManager)
  const { isUserLogged, usernameLogged } = useContext(UserLogged)

  const [refreshesBySort, setRefreshesBySort] = useState(0);
  const toggleRefresh = () => setRefreshesBySort(refreshesBySort + 1)


  return (
    <section className="home">
      {
        isUserLogged
          ? <>
            <h2>SuperTeam de {usernameLogged}</h2>
            <div className="teamAverage">

              <>
                {
                  averagePowerStats
                    ? <div className="resumeSection">

                      <div className='tableResume'>

                        <div className='rowResume'>
                          {
                            Object.keys(averagePowerStats).map(APS => <div key={'div' + APS} className='powerStatImgContainer'>
                              <PowerStatImg className='statImg' powerStat={APS} />
                            </div>)
                          }
                        </div>
                        <div className='rowResume'>
                          {
                            Object.keys(averagePowerStats).map((APS) => <div key={'div' + APS} className='powerStatResumeContainer'>

                              <span title={`Total ${APS} equipo`} onClick={() => alert(`Total ${APS} equipo`)}>
                                {totalPowerStats[APS]}
                              </span>

                              <span title={`Promedio ${APS} equipo`} onClick={() => alert(`Promedio ${APS} equipo`)} >
                                {averagePowerStats[APS]}
                              </span>
                            </div>)
                          }
                        </div>

                      </div>
                    </div>
                    : null
                }
              </>
            </div >
            {
              superTeam.length
                ? <SortButton toSort={superTeam} displayFunction={manageSuperTeam} varUseEffect={toggleRefresh} arraySortingTerms={heroSortingTerms} />
                : null
            }
            <div className="mySuperTeam">

              {
                superTeam.length
                  ? superTeam.map(h => <div className="heroInTeam" key={h.id}>
                    <span> {h.name}</span>
                    <ul>
                      {
                        Object.keys(h.powerstats).map((s, index) => <li key={index + 'team' + h.id}> <span className='powerStatName'>{s}</span> <span>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
                      }
                    </ul>
                    <button onClick={() => removeHero(h)}>Quitar {h.name}</button>
                  </div>
                  )
                  : <div className="noTeamContainer">
                    <h5>¡No tienes un equipo activo!</h5>
                    <p>Para agregar heroes a tu equipo, puedes hacer click <strong><Link to='/search'>aqui</Link></strong> </p>
                  </div>
              }
            </div>
          </>
          : null
      }
    </section >
  )
}

export default HomePage