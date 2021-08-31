import React, { useEffect, useState } from 'react'

import './teamPowerStatInfo.scss'

const TeamPowerStatInfo = ({ powerStat, powerStatAverage, powerStatTotal, isHero = false }) => {

  powerStatTotal = (
    powerStatTotal === 'null' || powerStatTotal === 'Null'
      ? 0
      : powerStatTotal
  )

  const [imgPath, setImgPath] = useState('')

  useEffect(() => {
    let path = '/icons/'
    switch (powerStat) {
      case 'combat':
        path += 'fighting.svg'
        break;
      case 'power':
        path += 'power.svg'
        break
      case 'strength':
        path += 'strength.svg'
        break
      case 'durability':
        path += 'shield.svg'
        break
      case 'intelligence':
        path += 'brain.svg'
        break
      case 'speed':
        path += 'speed.svg'
        break
      default:
        path += powerStat
    }
    setImgPath(path)
  }, [powerStat])


  return (
    isHero
      ? <div
        className='powerStatResumeContainer'
        title={`${powerStat}: ${powerStatTotal}`}
        onClick={() => alert(`${powerStat.toUpperCase()} ${powerStatTotal}`)}
      >

        <img className='statImg' src={imgPath} alt={powerStat} />
        <span>
          {powerStatTotal}
        </span>
      </div>
      : <div
        className='powerStatResumeContainer'
        title={`${powerStat} Equipo: Total  ${powerStatTotal} - Promedio ${powerStatAverage}`}
        onClick={() => alert(`${powerStat.toUpperCase()} EQUIPO\n\tTotal  ${powerStatTotal} - Promedio ${powerStatAverage}`)}
      >

        <img className='statImg' src={imgPath} alt={powerStat} />
        <span>
          {powerStatTotal}
        </span>
      </div>
  )
}

export default TeamPowerStatInfo