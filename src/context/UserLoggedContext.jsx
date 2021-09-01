import React, { createContext, useState, useEffect } from 'react';

import { digestMessage } from '../Helpers/Helpers.js';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setUserLogged] = useState(false)

  const [usernameLogged, setUsernameLogged] = useState(null)
  const [shortUsernameLogged, setShortUsernameLogged] = useState(null)
  const [UENCRYPT, setUENCRYPT] = useState(null)

  const [userInfo, setUserInfo] = useState({})

  const [loggingIn, setLoggingIn] = useState(false)
  const [triedWrongCredentials, setTriedWrongCredentials] = useState(false);

  const tryLogIn = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const lowerMail = (ev.target.userEmail.value).toLowerCase()

    const credentials = {
      email: lowerMail,
      password: ev.target.userPassword.value
    }

    if (!loggingIn) {
      setLoggingIn(true)
      setUserInfo(credentials)
    }
  }

  useEffect(() => {

    const sessionData = {}
    // No he visto como hacer auth con otras herramientas, asi que por ahora servira
    const authUser = (encryptedMail, encryptedPassword) => {
      const users = [
        {
          mail: '9bc5e0d6ba78769e7aea29c57d9315348a6d879ac22a17b68cd14fe00e1f1478',
          password: '275976081ce1abf67779eb3c388b5e14531082e52137502e264776e1a6a11595',
        },
        {
          mail: '97d0f744548aa446bba6cbb198d375bd8b224429f59093016b7fa90d1b3febda',
          password: '76cb73cd1829daa4fa75788e27a756600b5f62ab03f2a9bd15d4a56644a22b78',
        }
      ]
      const u = users.find(u => u.mail === encryptedMail)
      const ok = u?.password === encryptedPassword || false

      return ok
    }

    const logIn = async ({ email, password }) => {
      setLoggingIn(true)

      const digestMail = await digestMessage(email);
      const digestPass = await digestMessage(password);
      const validCredential = authUser(digestMail, digestPass)


      sessionData.mail = email
      sessionData.mDig = digestMail
      sessionData.pDig = digestPass
      sessionData.mv = validCredential

      return new Promise((resolve, reject) => {

        if (sessionData.mv) {
          resolve({ ok: true, token: 1234567, mail: sessionData.mail, mailEn: sessionData.mDig })
        }
        else {
          reject('Bad credentials')
        }
      })
    }


    if (loggingIn) {
      logIn(userInfo)
        .then(r => {
          if (r.ok) {
            localStorage.setItem('superteam_access', r.token)
            localStorage.setItem('superteam_email', r.mail)
            setUsernameLogged(r.email)

            const shortedLogIn = ((r.email).split('@')[0]).toUpperCase()
            setShortUsernameLogged(shortedLogIn)
          }
        })
        .catch(err => {
          setTriedWrongCredentials(true)
        })
        .finally((e) => {
          setLoggingIn(false)

          sessionData.mv && setUserLogged(true)
        })
    }
  }, [loggingIn, userInfo])

  useEffect(() => {
    if (triedWrongCredentials) {
      var reset = setTimeout(() => {
        setTriedWrongCredentials(false)
        setUserInfo({})
      }, 1500)
    }
    return () => {
      clearTimeout(reset)
    }
  }, [triedWrongCredentials])


  useEffect(() => {
    const tryRetrieveLocalSession = async () => {
      const sessionInLocalStorage = {
        access: localStorage.getItem('superteam_access'),
        email: localStorage.getItem('superteam_email')
      }
      const shortedLocalStorage = ((sessionInLocalStorage.email).split('@')[0]).toUpperCase()

      if (sessionInLocalStorage.access && sessionInLocalStorage.access !== undefined) {
        setUsernameLogged(sessionInLocalStorage.email)
        setShortUsernameLogged(shortedLocalStorage)
        setUENCRYPT(await digestMessage(sessionInLocalStorage.email))
        setUserLogged(true)
      }
      else {
        setUsernameLogged(null)
        setUENCRYPT(null)
        setShortUsernameLogged(null)
        setUserLogged(false)
      }
    }
    tryRetrieveLocalSession()
  }, [])

  return <UserLogged.Provider
    value={{
      UENCRYPT,
      isUserLogged, setUserLogged,
      usernameLogged, setUsernameLogged,
      shortUsernameLogged, setShortUsernameLogged,
      loggingIn, tryLogIn, triedWrongCredentials
    }}
  >
    {children}
  </UserLogged.Provider>;
}