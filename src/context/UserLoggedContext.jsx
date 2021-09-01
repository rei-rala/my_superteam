import React, { createContext, useState, useEffect } from 'react';

import { digestMessage } from '../Helpers/Helpers.js';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setUserLogged] = useState(false)

  const [usernameLogged, setUsernameLogged] = useState(null)
  const [shortUsernameLogged, setShortUsernameLogged] = useState(null)

  const [userInfo, setUserInfo] = useState(null)

  const [loggingIn, setLoggingIn] = useState(false)
  const [triedWrongCredentials, setTriedWrongCredentials] = useState(false);

  const [areCredsValid, setAreCredsValid] = useState(false)

  const authUser = (encryptedMail, encryptedPassword) => {
    const users = [
      {
        mail: '9bc5e0d6ba78769e7aea29c57d9315348a6d879ac22a17b68cd14fe00e1f1478',
        password: '275976081ce1abf67779eb3c388b5e14531082e52137502e264776e1a6a11595',
      },
      {
        mail: '97d0f744548aa446bba6cbb198d375bd8b224429f59093016b7fa90d1b3febda',
        password: '76cb73cd1829daa4fa75788e27a756600b5f62ab03f2a9bd15d4a56644a22b78',
      },
      {
        mail: '957b96fcb88c20e3d8d3abe3ab0685cbbac8734b7dc0f928dbb6a8794dd74e9f',
        password: 'f680e0021dcaf15d161604378236937225eeecae85cc6cda09ea85fad4cc51bb'
      }
    ]
    const u = users.find(u => u.mail === encryptedMail)
    const isOk = u?.password === encryptedPassword || false

    return isOk
  }


  const tryLogIn = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const lowerMail = (ev.target.userEmail.value).toLowerCase()

    logIn({
      email: lowerMail,
      password: ev.target.userPassword.value
    })
  }


  const logIn = async (userInfoInput) => {
    setLoggingIn(true)
    const digestMail = await digestMessage(userInfoInput.email);
    const digestPass = await digestMessage(userInfoInput.password);
    const validCredential = authUser(digestMail, digestPass)
    const shortUsername = (userInfoInput.email).split('@')[0]

    new Promise((resolve, reject) => {
      validCredential && resolve({
        ok: true,
        token: 'STANDALONE',
        shortEmail: shortUsername,
        email: userInfoInput.email,
        authMail: digestMail
      })

      !validCredential && reject({ ok: false })
    })
      .then(r => {
        if (r.ok) {
          localStorage.setItem('superteam_tokenStandalone', r.token)
          localStorage.setItem('superteam_email', r.email)
          setUsernameLogged(r.email)
          setShortUsernameLogged(r.shortEmail)
          setUserInfo({ ...userInfoInput, emailEncrypted: r.authMail })

          setAreCredsValid(true)
        }
        else {
          throw new Error(r.ok)
        }
      })
      .catch(err => {
        setTriedWrongCredentials({ error: !err.ok, type: 'Credenciales incorrectas' })
        setAreCredsValid(false)
      })
      .finally(() => setLoggingIn(false))
  }



  useEffect(() => {
    areCredsValid && setUserLogged(true)
  }, [areCredsValid])


  useEffect(() => {
    if (triedWrongCredentials.error) {

      var reset = setTimeout(() => {
        setTriedWrongCredentials({ error: false })
        setUserInfo()
      }, 1500)
    }
    return () => {
      clearTimeout(reset)
    }
  }, [triedWrongCredentials])


  useEffect(() => {
    const tryRetrieveLocalSession = async () => {
      const sessionLS = {
        token: localStorage.getItem('superteam_tokenStandalone'),
        email: localStorage.getItem('superteam_email')
      }

      if ((sessionLS.email === 'challenge@alkemy.org' || sessionLS.email === 'ramonirala@superteam.com' || sessionLS.email === 'rimi@superteam.com')
        && sessionLS.token === 'STANDALONE') {

        const shortedLocalStorage = ((sessionLS.email).split('@')[0]).toUpperCase()
        const mailenc = await digestMessage(sessionLS.email)

        setUsernameLogged(sessionLS.email)
        setShortUsernameLogged(shortedLocalStorage)

        setUserInfo({ email: sessionLS.email, emailEncrypted: mailenc })
        setAreCredsValid(true)
      }
      else {
        setUsernameLogged(null)
        setShortUsernameLogged(null)
        setAreCredsValid(false)
      }
    }
    tryRetrieveLocalSession()
  }, [])

  return <UserLogged.Provider
    value={{
      areCredsValid, setAreCredsValid,
      userInfo, isUserLogged, setUserLogged,
      usernameLogged, setUsernameLogged,
      shortUsernameLogged, setShortUsernameLogged,
      loggingIn, tryLogIn,
      triedWrongCredentials
    }}
  >
    {children}
  </UserLogged.Provider>;
}