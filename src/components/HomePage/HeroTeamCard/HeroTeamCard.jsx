import React, { useContext } from 'react'
import './heroTeamCard.scss'

import HeroInTeamPowerStat from '../HeroInTeamPowerStat/HeroInTeamPowerStat'
import { SuperTeamManager } from '../../../context/SuperTeamManagerContext'

const HeroTeamCard = ({ hero, removeHeroAction }) => {
  const { checkAlignment } = useContext(SuperTeamManager)

  return (
    <div className="heroInTeam" >
      <h3> {hero.name}</h3>
      <div className="heroInTeamBody">
        <img src={hero.image.url} alt="" />

        <div className="heroInTeamData">
          <p className={'heroAlignment ' + checkAlignment(hero)}>Alignment <strong>{checkAlignment(hero)}</strong></p>
          <HeroInTeamPowerStat hero={hero} />

          <div className="heroInTeamActions" >
            <button title={`Informacion detallada sobre ${hero.name}`}>Detalles</button>
            <button onClick={removeHeroAction} title={`Quitar a ${hero.name} de tu equipo`}>Quitar</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default HeroTeamCard