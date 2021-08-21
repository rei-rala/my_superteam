import React, { createContext, useEffect, useState } from 'react';
//import { UserLogged } from './UserLoggedContext';

export const SuperTeamManager = createContext();

export const SuperTeamManagerContext = ({ children }) => {
  //const { isUserLogged } = useContext(UserLogged)

  const [superTeam, setSuperTeam] = useState([])

  const [averagePowerStats, setAveragePowerStats] = useState(null)
  const manageAveragePowerStats = (powerStatsObject) => setAveragePowerStats(powerStatsObject)

  const addHero = (hero) => {
    if (superTeam.map(h => h.id).includes(hero.id)) {
      alert(`${hero.name} ya esta en tu equipo`)
    }
    else {
      setSuperTeam([...superTeam, hero])
    }
  }

  const removeHero = (hero) => {
    if (superTeam.map(h => h.id).includes(hero.id)) {
      if (window.confirm(`Desea quitar a ${hero.name} de su equipo?`)) {
        setSuperTeam(superTeam.filter(heroInTeam => heroInTeam.id !== hero.id))
      }
    }
  }

  useEffect(() => {

    if (superTeam.length) {


      const arrayHeroStats = superTeam.map(hero => hero.powerstats)
      const superTeamTotalPowerStats = {}
      const AveragePowerStats = {}

      arrayHeroStats.forEach(HS => {
        Object.keys(HS).forEach(stat => {

          if (!superTeamTotalPowerStats[stat]) {
            if (HS[stat] !== 'null') {
              superTeamTotalPowerStats[stat] = parseInt(HS[stat])
            }
            else {
              superTeamTotalPowerStats[stat] = 0
            }
          }
          else if (superTeamTotalPowerStats[stat]) {
            if (HS[stat] !== 'null') {
              superTeamTotalPowerStats[stat] += parseInt(HS[stat])
            }
            else {
              superTeamTotalPowerStats[stat] += 0
            }
          }
        })
      })
      console.log(superTeamTotalPowerStats)


      for (let PS in superTeamTotalPowerStats) {
        console.info(PS)
        AveragePowerStats[PS] = (superTeamTotalPowerStats[PS] ? Math.ceil(superTeamTotalPowerStats[PS] / superTeam.length) : 0)

      }

      manageAveragePowerStats(null)
      manageAveragePowerStats(AveragePowerStats)

    }
    else {
      manageAveragePowerStats(null)
    }
  }, [superTeam])

  useState(() => {
    console.table(averagePowerStats)
  }, [averagePowerStats])

  return (<SuperTeamManager.Provider value={{ superTeam, addHero, removeHero, averagePowerStats }}> {children} </SuperTeamManager.Provider>
  )
}