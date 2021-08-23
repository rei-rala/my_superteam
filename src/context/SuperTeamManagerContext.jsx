import React, { createContext, useEffect, useState } from 'react';
//import { UserLogged } from './UserLoggedContext';

export const SuperTeamManager = createContext();

export const SuperTeamManagerContext = ({ children }) => {
  //const { isUserLogged } = useContext(UserLogged)

  const [superTeam, setSuperTeam] = useState([])
  const manageSuperTeam = (team) => setSuperTeam(team)

  const [averagePowerStats, setAveragePowerStats] = useState(null)
  const manageAveragePowerStats = (powerStatsObject) => setAveragePowerStats(powerStatsObject)


  const checkMaxTeam = () => {
    return superTeam
      ? superTeam.lenght >= 6 ?
        true
        : false
      : false
  }

  const checkAlignment = (hero) => {
    return hero.biography.alignment
  }

  const checkMaxByAlignment = (hero) => {
    return superTeam.filter(heroInTeam => checkAlignment(heroInTeam) === checkAlignment(hero)).length >= 3
  }

  const addHero = (hero) => {
    if (superTeam.map(h => h.id).includes(hero.id)) {
      alert(`${hero.name} ya esta en tu equipo`)
    }
    else {
      if (checkMaxByAlignment(hero)) {
        alert(`Alcanzado tope de heroes para orientacion ${hero.biography.alignment}`)
      }
      else {
        if (checkMaxTeam()) {
          alert(`Alcanzado tope de heroes.`)
        }
        else {
          manageSuperTeam([...superTeam, hero])
        }
      }
    }
  }

  const removeHero = (hero) => {
    if (superTeam.map(h => h.id).includes(hero.id)) {
      if (window.confirm(`Desea quitar a ${hero.name} de su equipo?`)) {
        manageSuperTeam(superTeam.filter(heroInTeam => heroInTeam.id !== hero.id))
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

      for (let powerstat in superTeamTotalPowerStats) {
        AveragePowerStats[powerstat] = (
          superTeamTotalPowerStats[powerstat]
            ? Math.ceil(superTeamTotalPowerStats[powerstat] / superTeam.length)
            : 0
        )
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

  const [heroSortingTerms, setHeroSortingTerms] = useState(null)
  useEffect(() => {
    if (superTeam.length > 1) {
      const firstHeroStats = Object.keys((superTeam[0]).powerstats).map(s => `powerstats.${s}`)
      const customSortingTerms = ['name', 'biography.alignment', ...firstHeroStats]

      setHeroSortingTerms(customSortingTerms)
    }
  }, [superTeam])

  return (<SuperTeamManager.Provider value={{ superTeam, heroSortingTerms, manageSuperTeam, checkMaxTeam, checkAlignment, checkMaxByAlignment, addHero, removeHero, averagePowerStats }}> {children} </SuperTeamManager.Provider>
  )
}