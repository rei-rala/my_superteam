import React, { createContext, useState, useEffect } from 'react';

import { digestMessage } from '../Helpers/Helpers.js';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false)

  const [usernameLogged, setUsernameLogged] = useState('')

  const [userInfo, setUserInfo] = useState({})
  const manageUserInfo = (credentials) => setUserInfo(credentials)

  const [loggingIn, setLoggingIn] = useState(false)
  const manageLoggingIn = (bool) => setLoggingIn(bool)

  const [triedWrongCredentials, setTriedWrongCredentials] = useState(false);
  const manageTriedWrongCredentials = (bool) => setTriedWrongCredentials(bool)

  const manageUserLogged = (bool) => setIsUserLogged(bool);
  const manageUsernameLogged = (username) => setUsernameLogged(username)


  const tryLogIn = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const credentials = {
      email: ev.target.userEmail.value,
      password: ev.target.userPassword.value
    }

    if (!loggingIn) {
      manageLoggingIn(true)
      manageUserInfo(credentials)
    }
  }

  useEffect(() => {

    const logIn = async ({ email, password }) => {
      manageLoggingIn(true)

      const compareWithDigestHex = async (emailInput, passwordInput) => {
        const digestMail = await digestMessage(emailInput);
        const digestPass = await digestMessage(passwordInput);


        const sessionData = {
          mDig: digestMail,
          mv: (
            digestMail === '9bc5e0d6ba78769e7aea29c57d9315348a6d879ac22a17b68cd14fe00e1f1478'
            || digestMail === '97d0f744548aa446bba6cbb198d375bd8b224429f59093016b7fa90d1b3febda'
          )
        }

        return new Promise((resolve, reject) => {
          try {
            if (sessionData.mv) {
              sessionData.pDig = digestPass
              sessionData.mp = (
                digestPass === '275976081ce1abf67779eb3c388b5e14531082e52137502e264776e1a6a11595'
                || digestPass === '76cb73cd1829daa4fa75788e27a756600b5f62ab03f2a9bd15d4a56644a22b78'
              )

              if (sessionData.mp) {
                resolve({ res: 'ok', token: 1234567 })
              }
              else {
                throw new Error('nope')
              }
            }
            else {
              throw new Error('nope')
            }
          }
          catch (err) {
            reject('Bad credentials')
          }
        })
      }

      compareWithDigestHex(email, password)
        .then(r => {
          if (r.res === 'ok') {

            localStorage.setItem('superteam_access', r.token)
            localStorage.setItem('superteam_email', userInfo.email)
            manageUsernameLogged(userInfo.email)
          }
        })
        .catch(err => {
          manageTriedWrongCredentials(true)
        })
        .finally(() => {
          manageLoggingIn(false)
          if (userInfo.email && localStorage.getItem('superteam_access') === 'ok') {
            manageUserLogged(true)
          }
        })
    }

    if (loggingIn) { logIn(userInfo) }
  }, [loggingIn, userInfo])

  useEffect(() => {
    if (triedWrongCredentials) {
      var reset = setTimeout(() => {
        manageTriedWrongCredentials(false)
        manageUserInfo({})
      }, 1500)
    }
    return () => {
      clearTimeout(reset)
    }
  }, [triedWrongCredentials])

  useEffect(() => {

    const tryRetrieve = async () => {
      const sessionInLocalStorage = {
        access: localStorage.getItem('superteam_access'),
        email: localStorage.getItem('superteam_email')
      }

      if (sessionInLocalStorage.access && sessionInLocalStorage.access !== undefined) {
        manageUserLogged(true)
        manageUsernameLogged(sessionInLocalStorage.email)
      }
    }
    tryRetrieve()
  })

  return <UserLogged.Provider value={{ isUserLogged, manageUserLogged, usernameLogged, manageUsernameLogged, tryLogIn, loggingIn, triedWrongCredentials }}> {children} </UserLogged.Provider>;
}