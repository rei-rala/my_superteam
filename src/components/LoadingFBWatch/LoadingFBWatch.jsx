import React, { useContext } from 'react'
import { ManageFirestore } from '../../context/ManageFirestore'

import Loading from '../Loading/Loading'
import './loadingFBWatch.scss'

const LoadingFBWatch = () => {
  const { loadingFB } = useContext(ManageFirestore)

  return loadingFB &&
    <div className='LOADINGFB'>
      <h1 className='loadingTitle'>Cargando...</h1>
      <Loading />
    </div>

}

export default LoadingFBWatch