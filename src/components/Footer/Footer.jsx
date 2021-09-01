import React, { useContext, useEffect, useState } from 'react'
import { SuperTeamManager } from '../../context/SuperTeamManagerContext'
import { Link } from 'react-router-dom'
import './footer.scss'

import CountAlignment from './CountAlignment/CountAlignment'
import { UserLogged } from '../../context/UserLoggedContext'

const Footer = ({ pageLocation, scrollTop }) => {
  const { superTeam, isTeamMaxed } = useContext(SuperTeamManager)
  const { isUserLogged } = useContext(UserLogged)

  const [footerResume, setFooterResume] = useState(null)
  const [backToTop, showBackToTop] = useState(false)


  useEffect(() => {
    const test = (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      window.scrollY > 450 && showBackToTop(true)
      window.scrollY <= 450 && showBackToTop(false)
    }
    window.addEventListener('scroll', test)

    return () => {
      window.removeEventListener('scroll', test)
    }
  }, []);


  useEffect(() => {
    if (superTeam.length) {
      const alignments = Array.from(new Set(superTeam.map(h => h.biography.alignment)))
      const resume = {}

      alignments.forEach(a => {
        resume[a] = superTeam.filter(h => h.biography.alignment === a).length
      })
      setFooterResume(resume)
    }
    else {
      setFooterResume(null)
    }
  }, [superTeam])

  return (
    isUserLogged &&
    <>
      <div className={`countByAlignment ${superTeam.length ? 'hasTeam' : 'hasNoTeam'}`}>
        {
          footerResume
            ? (Object.keys(footerResume)).map(a => <CountAlignment key={'footer' + a} type={a} typeCount={footerResume[a]} team={superTeam} isTeamMaxed={isTeamMaxed} />)
            : <CountAlignment />
        }
      </div>

      <div className={`quickAccess ${backToTop ? 'showQuickAccess' : ''}`}>

        <div className="quick1">
          {
            pageLocation && pageLocation === '/home'
              ? <Link to='/search'>Buscar heroes</Link>
              : <Link to='/home'>Mi equipo</Link>
          }
        </div>
        <div className="spacer"></div>
        <div className="quick2">
          <span onClick={scrollTop}>Volver al top</span>
        </div>
      </div>

    </>
  )
}

export default Footer;