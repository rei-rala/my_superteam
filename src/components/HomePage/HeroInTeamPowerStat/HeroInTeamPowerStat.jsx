import React from 'react'


const HeroInTeamPowerStat = ({ hero }) => {
  const unnulify = (heroPowerstat) => {
    return heroPowerstat === 'null' ? 0 : heroPowerstat
  }

  return (
    <ul>
      {
        Object.keys(hero.powerstats).map((s, index) => <li key={index + 'team' + hero.id}> <span className='desktopPS' title={s}>{s.slice(0, 3)}</span> <span className='mobilePS'>{s}</span> <br /> {unnulify(hero.powerstats[s])}</li>)
      }
    </ul>
  )
}

export default HeroInTeamPowerStat