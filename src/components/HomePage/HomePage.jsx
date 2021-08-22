import React, { useContext, useEffect, useState } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'

import SortButton from '../SortButton/SortButton'

const HomePage = () => {

  const { superTeam, manageSuperTeam, removeHero, averagePowerStats } = useContext(SuperTeamManager)
  const { isUserLogged, usernameLogged } = useContext(UserLogged)

  const [refreshesBySort, setRefreshesBySort] = useState(0);
  const toggleRefresh = () => setRefreshesBySort(refreshesBySort + 1)

  useEffect(() => {
    const team = superTeam

    if (superTeam) {
      manageSuperTeam([])
      manageSuperTeam(team)
    }
  }, [refreshesBySort, manageSuperTeam, superTeam])
  !superTeam[0] ?? console.log(Object.keys((superTeam[0])))
  return (
    <section className="home">
      {
        isUserLogged
          ? <>
            <h2>SuperTeam de {usernameLogged}</h2>
            <hr />
            <SortButton toSort={superTeam} displayFunction={() => { }} varUseEffect={toggleRefresh} arraySortingTerms={['id', 'name', ['biography']['alignment']]} />
            <>

              {
                averagePowerStats
                  ? <ul>
                    {
                      Object.keys(averagePowerStats).map((APS) => <li key={APS}>
                        {`${APS}: ${averagePowerStats[APS]}`}
                      </li>)
                    }
                  </ul>
                  : 'Sin heroes'
              }
              <hr />
              {
                superTeam.length
                  ? superTeam.map(h => <div className="mySuperTeam" key={h.id}>
                    <span> {h.name}</span>
                    <ul>
                      {
                        Object.keys(h.powerstats).map((s, index) => <li key={index + 'team' + h.id}> <span className='powerStatName'>{s}</span> <span>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
                      }
                    </ul>
                    <button onClick={() => removeHero(h)}>Quitar {h.name}</button>
                  </div>
                  )

                  : 'Agrega heroes'
              }
            </>
          </>
          : null
      }
      <br />
      <i>FIN DE HOME</i>
      <hr />
    </section>
  )
}

export default HomePage