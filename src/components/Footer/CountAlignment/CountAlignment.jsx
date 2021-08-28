import React from 'react'

const CountAlignment = ({ type = '', typeCount = 0 }) => {

  const fillByAligment = (heroAlignment) => {
    let fillColor = 'white'
    switch (heroAlignment) {
      case 'good':
        fillColor = 'lightgreen'
        break
      case 'bad':
        fillColor = 'red'
        break
      default:
        break
    }

    return fillColor
  }


  return (
    <div className="group" title={type} onClick={type !== '' ? () => alert(`Tienes ${typeCount} ${typeCount > 1 ? 'heroes' : 'heroe'} con alignment ${type}`) : null}>
      < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fillByAligment(type)} className="bi bi-file-person" viewBox="0 0 16 16" >
        <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
        <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg >
      <span>
        {typeCount >= 3 ? <strong>{typeCount}</strong> : typeCount}
      </span>
    </div >
  )
}

export default CountAlignment