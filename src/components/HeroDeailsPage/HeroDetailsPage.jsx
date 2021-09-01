import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeroDetail from './HeroDetail/HeroDetail'
import Loading from '../Loading/Loading'
import { ManageFirestore } from '../../context/ManageFirestore'

const HeroDetailsPage = () => {
  const { idHero } = useParams()
  const [gettingInfo, setGettingInfo] = useState(false)
  const [heroDetails, setHeroDetails] = useState(null)
  const { updatingFB } = useContext(ManageFirestore)

  useEffect(() => {
    const getHero = async (id) => {
      const axios = require('axios').default
      setGettingInfo(true)

      await axios.get(`https://superheroapi.com/api.php/547377806383395/${id}`)
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
    idHero && gettingInfo
      ? <Loading />
      : heroDetails
        ? <>
          <HeroDetail hero={heroDetails} />
          {
            updatingFB && <Loading />
          }
        </>
        : '404 - No se encontro al heroe especificado'
  )
}

export default HeroDetailsPage