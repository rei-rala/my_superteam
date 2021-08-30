import React from 'react'

import './heroDetail.scss'
import TeamPowerStatInfo from '../../HomePage/TeamPowerStatInfo/TeamPowerStatInfo'
import { useHistory } from 'react-router-dom'


const HeroDetail = ({ hero }) => {
  const history = useHistory()

  console.log(hero)

  return (
    <section className='heroDetailContainer'>

      <div className="heroDetail_Head">

        <h2>{hero.name}</h2>
        <div className="heroPowerStats">
          {
            (Object.keys(hero.powerstats)).map(PS => <TeamPowerStatInfo key={PS + hero.id} powerStat={PS} powerStatTotal={hero.powerstats[PS]} isHero={true} />)
          }
        </div>
      </div>

      <div className="heroDetail_Body">
        <img className='heroDetailImg' src={hero.image.url} alt={hero.name} />

        <div className="sideData">
          <ul>
            <li>Alignment: {hero.biography.alignment}</li>
            <li className='aliasUL'> {hero.biography.aliases.length < 1
              ? 'No alias'
              : hero.biography.aliases.length === 1
                ? 'Alias'
                : 'Aliases'
            }:
              <ul>
                {hero.biography.aliases.length && hero.biography.aliases.map(alias => <li key={alias + hero.id} className='subList'>{alias}</li>)}
              </ul>
            </li>
            <li>Height: {hero.appearance.height[1]}</li>
            <li>Weight: {hero.appearance.weight[1]}</li>
            <li>Eye color: {hero.appearance['eye-color']}</li>
            <li>Hair color: {hero.appearance['hair-color']}</li>
            <li>Work base: {hero.work.base}</li>
          </ul>

        </div>


      </div>
      <button onClick={() => history.goBack()}> Volver</button>
    </section>
  )
}

export default HeroDetail