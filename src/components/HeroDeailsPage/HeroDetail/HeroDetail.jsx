import React, { useContext } from 'react'

import './heroDetail.scss'
import TeamPowerStatInfo from '../../HomePage/TeamPowerStatInfo/TeamPowerStatInfo'
import { useHistory } from 'react-router-dom'
import HeroOptionsBtn from '../../SearchHeroPage/SearchResults/HeroCard/HeroOptionsBtn/HeroOptionsBtn'
import { replaceImgNotFound } from '../../../Helpers/Helpers'
import { SuperTeamManager } from '../../../context/SuperTeamManagerContext'

const HeroDetail = ({ hero }) => {
  const { superTeam, isTeamMaxed, checkAlignment, checkMaxByAlignment, addHero, removeHero } = useContext(SuperTeamManager)
  const history = useHistory()

  const {
    id,
    name = 'error',
    powerstats = {},
    biography: {
      alignment,
      aliases
    } = {},
    image: { url } = {},
    appearance: {
      weight: [, weightKG] = '',
      height: [, heightCM] = '',
      'hair-color': hairColor = '',
      'eye-color': eyeColor = '',
    },
    work: { base } = {}
  } = hero

  return (
    <section className='heroDetailContainer'>
      <div className="detailOptionsDesktop">
        {
          superTeam.map(heroInTeam => heroInTeam.id).includes(hero.id)
            ? <HeroOptionsBtn type='remove' onClick={() => removeHero(hero)} title={`Quitar ${hero.name} de equipo`} />
            : isTeamMaxed
              ? <HeroOptionsBtn title={`Tu equipo esta completo`} />
              : checkMaxByAlignment(hero)
                ? <HeroOptionsBtn title={`Tu equipo alcanzo el tope para heroes con orientacion ${checkAlignment(hero) === 'good' ? 'buena' : 'mala'} `} />
                : <HeroOptionsBtn type='add' onClick={() => addHero(hero)} title={`Agregar ${hero.name} a equipo`} />
        }
        <button onClick={() => history.goBack()}> Volver</button>
      </div>

      <div className="heroDetail_Head">
        <h2>{name}</h2>
        <div className="heroPowerStats">
          {
            (Object.keys(powerstats)).map(PS => <TeamPowerStatInfo key={PS + id} powerStat={PS} powerStatTotal={powerstats[PS] === 'Null' ? 0 : powerstats[PS]} isHero={true} />)
          }
        </div>
      </div>

      <div className="heroDetail_Body">
        <img className='heroDetailImg' onError={replaceImgNotFound} src={url} alt={name} />

        <div className="sideData">
          <ul>
            <li>Alignment: {alignment}</li>
            <li className='aliasUL'> {aliases.length < 1
              ? 'No alias'
              : aliases.length === 1
                ? 'Alias'
                : 'Aliases'
            }:
              <ul>
                {aliases.length && aliases.map(alias => alias !== '-' ? <li key={alias + id} className='subList'>{alias}</li> : <li key={alias + id} className='subList'>Sin alias</li>)}
              </ul>
            </li>
            <li>Height: {heightCM}</li>
            <li>Weight: {weightKG}</li>
            <li>Eye color: {eyeColor}</li>
            <li>Hair color: {hairColor}</li>
            <li>Work base: {base}</li>
          </ul>

        </div>


      </div>
      <div className="detailOptionsMobile">
        {
          superTeam.map(heroInTeam => heroInTeam.id).includes(hero.id)
            ? <HeroOptionsBtn type='remove' onClick={() => removeHero(hero)} title={`Quitar ${hero.name} de equipo`} />
            : isTeamMaxed
              ? <HeroOptionsBtn title={`Tu equipo esta completo`} />
              : checkMaxByAlignment(hero)
                ? <HeroOptionsBtn title={`Tu equipo alcanzo el tope para heroes con orientacion ${checkAlignment(hero) === 'good' ? 'buena' : 'mala'} `} />
                : <HeroOptionsBtn type='add' onClick={() => addHero(hero)} title={`Agregar ${hero.name} a equipo`} />
        }
        <button onClick={() => history.goBack()}> Volver</button>
      </div>
    </section>
  )
}

export default HeroDetail