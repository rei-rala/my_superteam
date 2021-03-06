import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import HeroDetail from './HeroDetail/HeroDetail'

import Loading from '../Loading/Loading'
import LoadingFBWatch from '../LoadingFBWatch/LoadingFBWatch'

const HeroDetailsPage = () => {
  const { idHero } = useParams()
  const [gettingInfo, setGettingInfo] = useState(false)
  const [heroDetails, setHeroDetails] = useState(null)

  useEffect(() => {
    const getHero = async (id) => {
      const axios = require('axios').default
      setGettingInfo(true)

      await axios.get(`https://superheroapi.com/api.php/${process.env.REACT_APP_SUPERHEROAPIKEY}/${id}`)
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'success') {
            setHeroDetails(data)
          }
          else {
            setHeroDetails(null)
          }
        })
        .finally(() => setGettingInfo(false))
    }

    idHero && getHero(idHero)
  }, [idHero])

  return (
    idHero
      ? gettingInfo
        ? <Loading />
        : heroDetails
          ? <>
            <HeroDetail hero={heroDetails} />
            <LoadingFBWatch />
          </>
          : '404 - No se encontro al heroe especificado'
      : 'No se ingreso un termino valido'
  )
}

export default HeroDetailsPage