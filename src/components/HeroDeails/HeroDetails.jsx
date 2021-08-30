import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HeroDetails = () => {
  const { idHero } = useParams()
  const [gettingInfo, setGettingInfo] = useState(false)
  const [heroDetails, setHeroDetails] = useState({})
  /* isHero */

  useEffect(() => {
    if (idHero) {
      const axios = require('axios').default
      setGettingInfo(true)

      axios.get(`https://superheroapi.com/api.php/547377806383395/id/${idHero}`)
        .then(r => (r.data))
        .then(data => {
          if (data?.response === 'error') {
            //setHerosFound({ error: true })
          }
          else {
          }
        })
        .finally(() => setGettingInfo(false))
    }
  }, [idHero])

  return (
    <></>
  )
}

export default HeroDetails