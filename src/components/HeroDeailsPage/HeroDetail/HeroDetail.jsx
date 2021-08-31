import React from 'react'

import './heroDetail.scss'
import TeamPowerStatInfo from '../../HomePage/TeamPowerStatInfo/TeamPowerStatInfo'
import { useHistory } from 'react-router-dom'
import { replaceImgNotFound } from '../../../Helpers/Helpers'

const HeroDetail = ({ hero }) => {
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
      <button onClick={() => history.goBack()}> Volver</button>
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
      <button onClick={() => history.goBack()}> Volver</button>
    </section>
  )
}

export default HeroDetail