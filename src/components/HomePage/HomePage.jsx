import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'

const HomePage = () => {

  const { superTeam, removeHero, averagePowerStats } = useContext(SuperTeamManager)
  const { isUserLogged, usernameLogged } = useContext(UserLogged)

  return (
    <section className="home">
      {
        isUserLogged
          ? <>
            <h2>SuperTeam de {usernameLogged}</h2>
            <hr />
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
                        Object.keys(h.powerstats).map((s, index) => <li key={index + h.id}> <span>{s}</span> <span>{h.powerstats[s] === 'null' ? 0 : h.powerstats[s]}</span></li>)
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