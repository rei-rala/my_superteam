import React from 'react'
import './heroTeamCard.scss'

import { Link } from 'react-router-dom'
import { replaceImgNotFound } from '../../../Helpers/Helpers'

import HeroInTeamPowerStat from '../HeroInTeamPowerStat/HeroInTeamPowerStat'

const HeroTeamCard = ({ hero, removeHeroAction }) => {

  const {
    id,
    name,
    biography: { alignment } = {},
    image: { url } = {},
    appearance: { weight: [, weightKG] },
    appearance: { height: [, heightCM] }
  } = hero

  return (
    <div className="heroInTeam" >
      <h3> {name}</h3>
      <div className="heroInTeamBody">
        <img src={url} alt={name} onError={replaceImgNotFound} />

        <div className="heroInTeamData">
          <p className={`heroAlignment ${alignment}`}>Alignment <strong>{alignment}</strong></p>
          <HeroInTeamPowerStat hero={hero} />

          <div className="heroHW">
            <span> Peso {weightKG}</span>
            <span>Altura {heightCM}</span>
          </div>

          <div className="heroInTeamActions" >
            <Link to={`/hero/${id}`}> <button title={`Informacion detallada sobre ${name}`}>Detalles</button></Link>
            <button onClick={removeHeroAction} title={`Quitar a ${name} de tu equipo`}>Quitar</button>
          </div>
        </div>
      </div>
    </div >
  )

}

export default HeroTeamCard