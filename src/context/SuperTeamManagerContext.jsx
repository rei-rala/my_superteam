import React, { createContext, useEffect, useState } from 'react';

export const SuperTeamManager = createContext();

export const SuperTeamManagerContext = ({ children }) => {

  const [superTeam, setSuperTeam] = useState([])
  const manageSuperTeam = (team) => setSuperTeam(team)

  const [totalPowerStats, setTotalPowerStats] = useState(null)
  const manageAveragePowerStats = (powerStatsObject) => setAveragePowerStats(powerStatsObject)

  const [averagePowerStats, setAveragePowerStats] = useState(null)
  const manageTotalPowerStats = (powerStatsObject) => setTotalPowerStats(powerStatsObject)

  const [heroSortingTerms, setHeroSortingTerms] = useState(null)

  const [isTeamMaxed, setIsTeamMaxed] = useState(false)


  useEffect(() => {
    superTeam && superTeam.length >= 6
      ? !isTeamMaxed && setIsTeamMaxed(true)
      : isTeamMaxed && setIsTeamMaxed(false)


  }, [superTeam, isTeamMaxed])

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
        if (isTeamMaxed) {
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
      const firstHeroStats = Object.keys((superTeam[0]).powerstats).map(s => `powerstats.${s}`)
      const customSortingTerms = ['name', 'biography.alignment', ...firstHeroStats]

      setHeroSortingTerms(customSortingTerms)
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

      manageTotalPowerStats(superTeamTotalPowerStats)

      for (let powerstat in superTeamTotalPowerStats) {
        AveragePowerStats[powerstat] = (
          superTeamTotalPowerStats[powerstat]
            ? Math.ceil(superTeamTotalPowerStats[powerstat] / superTeam.length)
            : 0
        )
      }

      manageAveragePowerStats(null)
      manageAveragePowerStats(Object.fromEntries(Object.entries(AveragePowerStats).sort((a, b) => a[1] > b[1] ? -1 : 1)))
    }
    else {
      manageAveragePowerStats(null)
    }
    localStorage.setItem('superTeam', JSON.stringify(superTeam))
  }, [superTeam])


  return (<SuperTeamManager.Provider value={{ superTeam, heroSortingTerms, setHeroSortingTerms, manageSuperTeam, isTeamMaxed, checkAlignment, checkMaxByAlignment, addHero, removeHero, totalPowerStats, averagePowerStats }}> {children} </SuperTeamManager.Provider>
  )
}