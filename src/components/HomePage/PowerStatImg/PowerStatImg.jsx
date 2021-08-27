import React from 'react'

const PowerStatImg = ({ className, powerStat = '' }) => {

  const getAPSImgSource = (APS) => {
    return APS === 'combat'
      ? '/icons/fighting.svg'
      : APS === 'power'
        ? '/icons/power.svg'
        : APS === 'strength'
          ? "/icons/strength.svg"
          : APS === 'durability'
            ? '/icons/shield.svg'
            : APS === 'intelligence'
              ? '/icons/brain.svg'
              : APS === 'speed'
                ? '/icons/speed.svg'
                : APS
  }

  return <img className={className} src={getAPSImgSource(powerStat)} alt={powerStat} title={powerStat} />

}

export default PowerStatImg