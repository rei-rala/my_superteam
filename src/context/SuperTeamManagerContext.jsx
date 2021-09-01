import React, { createContext, useEffect, useState } from 'react';
import { tryParseInt } from '../Helpers/Helpers';

export const SuperTeamManager = createContext();

export const SuperTeamManagerContext = ({ children }) => {

  const [superTeam, setSuperTeam] = useState([])


  const [isTeamMaxed, setIsTeamMaxed] = useState(false)

  const [totalPowerStats, setTotalPowerStats] = useState(null)
  const [averagePowerStats, setAveragePowerStats] = useState(null)

  const [heroSortingTerms, setHeroSortingTerms] = useState(null)

  const [heroAvgHeightWeight, setHeroAvgHeightWeight] = useState({ weight: 0, height: 0 })

  const [updatingFB, setUpdatingFB] = useState(false)

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
        alert(`No se agrego ${hero.name}.\nAlcanzado tope de heroes para orientacion ${hero.biography.alignment}`)
      }
      else {
        if (isTeamMaxed) {
          alert(`Alcanzado tope de heroes.`)
        }
        else {
          setSuperTeam([...superTeam, hero])
        }
      }
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
      const firstHeroStats = Object.keys((superTeam[0]).powerstats).map(s => `powerstats.${s}`)
      const customSortingTerms = ['name', 'biography.alignment', ...firstHeroStats]

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

      const getAvgHeightWeight = () => {
        const totalHW = { weight: 0, height: 0 }

        for (let hero of superTeam) {
          const {
            appearance: { weight: [, weightKGSentence] },
            appearance: { height: [, heightCMSentence] }
          } = hero


          const weightKG = tryParseInt((weightKGSentence.split(' '))[0])
          const heightCM = tryParseInt((heightCMSentence.split(' '))[0])


          totalHW.weight += (typeof weightKG === typeof 0) && weightKG
          totalHW.height += (typeof heightCM === typeof 0) && heightCM
        }

        return {
          weight: Math.ceil(totalHW.weight / superTeam.length),
          height: Math.ceil(totalHW.height / superTeam.length)
        }
      }
      const avgHW = getAvgHeightWeight()

      setTotalPowerStats(superTeamTotalPowerStats)
      setHeroSortingTerms(customSortingTerms)
      setAveragePowerStats(Object.fromEntries(Object.entries(AveragePowerStats).sort((a, b) => a[1] > b[1] ? -1 : 1)))
      setHeroAvgHeightWeight(avgHW)
    }
    else {
      setAveragePowerStats(null)
      setTotalPowerStats(null)
      setHeroAvgHeightWeight({ height: 0, weight: 0 })
      setAveragePowerStats(null)
    }
    localStorage.setItem('superTeam', JSON.stringify(superTeam))
  }, [superTeam])


  return (
    <SuperTeamManager.Provider
      value={{
        updatingFB, setUpdatingFB,
        superTeam, setSuperTeam, addHero, removeHero,
        isTeamMaxed, checkAlignment, checkMaxByAlignment,
        heroSortingTerms, setHeroSortingTerms,
        totalPowerStats, averagePowerStats,
        heroAvgHeightWeight
      }}
    > {children} </SuperTeamManager.Provider>
  )
}