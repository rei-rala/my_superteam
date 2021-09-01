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


  const axios = require('axios').default
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source()

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
    const mailEnc = await digestMessage(userInfoInput.email)

    axios({
      method: 'post',
      url: 'http://challenge-react.alkemy.org/',
      data: userInfoInput
    }, {
      cancelToken: source.token,
    })
      .then(r => {
        try {

          if (r.status === 200) {
            console.log(`Iniciado con exito. Codigo ${r.status}`)

            localStorage.setItem('superteam_token', r.data.token)
            localStorage.setItem('superteam_email', userInfoInput.email)
            setUsernameLogged(userInfoInput.email)

            const shortUsername = (userInfoInput.email).split('@')[0]
            setShortUsernameLogged(
              (
                shortUsername.length > 12
                  ? shortUsername.slice(0, 9) + '...'
                  : shortUsername
              ).toUpperCase()
            )
            setUserInfo({ ...userInfoInput, emailEncrypted: mailEnc })
            setAreCredsValid(true)

          }
          else throw new Error('Error')
        }
        catch (err) {
          setTriedWrongCredentials({ error: true })
        }
      })
      .catch(err => {
        setTriedWrongCredentials({ error: true, type: err })
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
        token: localStorage.getItem('superteam_token'),
        email: localStorage.getItem('superteam_email')
      }

      if (
        sessionLS.email === 'challenge@alkemy.org'
        && sessionLS.token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE'
      ) {
        const shortedLocalStorage = ((sessionLS.email).split('@')[0]).toUpperCase()

        setUsernameLogged(sessionLS.email)
        setShortUsernameLogged(shortedLocalStorage)


        // hardcoded por ahora
        const mailenc = await digestMessage('challenge@alkemy.org')
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