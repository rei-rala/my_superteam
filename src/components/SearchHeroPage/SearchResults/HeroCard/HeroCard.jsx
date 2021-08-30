import React, { useContext, useEffect, useState } from 'react'
import { SuperTeamManager } from '../../../../context/SuperTeamManagerContext'
import HeroOptionsBtn from './HeroOptionsBtn/HeroOptionsBtn'

import './heroCard.scss'

const HeroCard = ({ hero }) => {
  const { superTeam, isTeamMaxed, checkAlignment, checkMaxByAlignment, addHero, removeHero } = useContext(SuperTeamManager)

  const [aligmentHero, setAlignmentHero] = useState(null)

  useEffect(() => {
    const alignmentCurrentHero = checkAlignment(hero)

    switch (alignmentCurrentHero) {
      case 'bad':
        setAlignmentHero('badHero')
        break;
      case 'good':
        setAlignmentHero('goodHero')
        break
      case 'neutral':
        setAlignmentHero('neutralHero')
        break
      default:
        setAlignmentHero('neutralHero')
        break
    }

  }, [hero, checkAlignment])


  return (
    <div className={`heroCard ${aligmentHero ?? ''}`} key={hero.id} title={hero.name} draggable>
      <strong>{hero.name}</strong>
      <div className='flip-card'>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={hero.image.url} alt={hero.name} draggable='false' />
          </div>

          <div className="flip-card-back">
            <ul>
              {
                Object.keys(hero.powerstats).map((s) => <li key={`PS - ${s} -${hero.id} `}> <span className='powerStatName'>{s}</span> <span className='powerStatValue'>{hero.powerstats[s] === 'null' ? 0 : hero.powerstats[s]}</span></li>)
              }
            </ul>
          </div>

        </div>
      </div>
      <div className="heroCardActions">
        {
          superTeam.map(heroInTeam => heroInTeam.id).includes(hero.id)
            ? <HeroOptionsBtn type='remove' onClick={() => removeHero(hero)} title={`Quitar ${hero.name} de equipo`} />
            : isTeamMaxed
              ? <HeroOptionsBtn title={`Tu equipo esta completo`} />
              : checkMaxByAlignment(hero)
                ? <HeroOptionsBtn title={`Tu equipo alcanzo el tope para heroes con orientacion ${checkAlignment(hero) === 'good' ? 'buena' : 'mala'} `} />
                : <HeroOptionsBtn type='add' onClick={() => addHero(hero)} title={`Agregar ${hero.name} a equipo`} />
        }
      </div>
    </div>
  )
}

export default HeroCard