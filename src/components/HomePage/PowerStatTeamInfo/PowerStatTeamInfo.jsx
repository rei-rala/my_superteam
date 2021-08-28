import React from 'react'

const PowerStatTeamInfo = ({ powerStat, powerStatAverage, powerStatTotal }) => {

  const getAPSImgSource = (APS) => {
    let path = '/icons/'
    switch (APS) {
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
        path += APS
    }
    return path
  }


  return <div
    className='powerStatResumeContainer'
    title={`${powerStat} Equipo: Total  ${powerStatTotal} - Promedio ${powerStatAverage}`}
    onClick={() => alert(`${powerStat.toUpperCase()} EQUIPO\n\tTotal  ${powerStatTotal} - Promedio ${powerStatAverage}`)}
  >

    <img className='statImg' src={getAPSImgSource(powerStat)} alt={powerStat} />
    <span>
      {powerStatTotal}
    </span>
  </div>



}

export default PowerStatTeamInfo