import React, { useContext, useEffect, useState } from 'react'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'
import './footer.scss'

import CountAlignment from './CountAlignment/CountAlignment'

const Footer = () => {
  const { superTeam } = useContext(SuperTeamManager)

  const [footerResume, setFooterResume] = useState(null)
  const manageFooterResume = (info) => setFooterResume(info)

  useEffect(() => {
    if (superTeam.length) {
      const alignments = Array.from(new Set(superTeam.map(h => h.biography.alignment)))
      const resume = {}

      alignments.forEach(a => {
        resume[a] = superTeam.filter(h => h.biography.alignment === a).length
      })
      manageFooterResume(resume)
    }
    else {
      console.log('Sin heroes')
      manageFooterResume(null)
    }
    console.log(superTeam)
  }, [superTeam])

  return (
    <footer className={superTeam.length ? 'hasTeam' : 'hasNoTeam'}>
      {
        footerResume
          ? (Object.keys(footerResume)).map(a => <CountAlignment key={'footer' + a} type={a} typeCount={footerResume[a]} />)
          : <CountAlignment />
      }
    </footer>
  )
}

export default Footer;