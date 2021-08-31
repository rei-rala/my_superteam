import React from 'react'
import Spinner_1s_200px from './Spinner_1s_200px.svg'
import './loading.css'

const Loading = () => {
  return (
    <div className="loadingContainer">
      <img src={Spinner_1s_200px} alt="Cargando" />
    </div>
  )
}

export default Loading