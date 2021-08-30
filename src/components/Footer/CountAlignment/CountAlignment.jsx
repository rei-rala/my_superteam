import React, { useEffect, useState } from 'react'

const CountAlignment = ({ type = '', typeCount = 0, team, isTeamMaxed }) => {

  const [herosByAlignment, setHerosByAlignment] = useState('')
  const [fillByAlignment, setfillByAlignment] = useState(null)


  const alertFunction = (
    type && type !== ''
      ? () => alert(`Tienes en equipo ${typeCount} ${typeCount > 1 ? 'heroes' : 'heroe'} con alignment ${type}: ${herosByAlignment}`)
      : null
  )

  useEffect(() => {
    let fillColor = 'white'
    switch (type) {
      case 'good':
        fillColor = 'lightgreen'
        break
      case 'bad':
        fillColor = 'red'
        break
      default:
        break
    }
    setfillByAlignment(fillColor)

  }, [type])


  useEffect(() => {
    if (team && team.length > 0) {
      const heros = team.filter(h => (h.biography.alignment === type))
      const formatedNames = heros && `\n\t-${heros.map(h => h.name).join('\n\t-')}`

      setHerosByAlignment(formatedNames)
    }
  }, [team, type])


  return (
    <div className={`group ${type}`} title={`${type}: ${herosByAlignment}`} onClick={alertFunction}>
      < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fillByAlignment} className="bi bi-file-person" viewBox="0 0 16 16" >
        <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
        <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg >
      <span>
        {
          typeCount >= 3 || isTeamMaxed
            ? <strong>{typeCount}</strong>
            : typeCount
        }
      </span>
    </div >
  )
}

export default CountAlignment