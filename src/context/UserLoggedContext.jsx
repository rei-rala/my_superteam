import React, { createContext, useState, useEffect } from 'react';

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


  const axios = require('axios').default

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
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()

    const logIn = async () => {
      manageLoggingIn(true)

      //const process =
      axios({
        method: 'post',
        url: 'http://challenge-react.alkemy.org/',
        data: userInfo
      }, {
        cancelToken: source.token,
      })
        .then(r => {
          if (r.status === 200) {
            console.log(`Iniciado con exito. Codigo ${r.status}`)
            localStorage.setItem('superteam_access', r.data.token)
            localStorage.setItem('superteam_email', userInfo.email)
            manageUsernameLogged(userInfo.email)
            return true
          }
        })
        .catch(err => {
          manageTriedWrongCredentials(true)
        })
        .finally(validLogIn => {
          manageLoggingIn(false)
          if (validLogIn) {
            manageUserLogged(true)
          }
        })
    }

    if (loggingIn) { logIn() }

    return () => {
      source.cancel('Cancelado por usuario')
    }
  })

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
    /*     const digestMessage = async (message) => {
          const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
          const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
          const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
          return hashHex;
        }
    
        const compareWithDigestHex = async (message) => {
          const digestHex = await digestMessage(message);
          return digestHex === 'd211897d86c8d4ccff699e0b071530ae68b3de359ec4a8801736341b5a9933f8'
        } */


    const tryRetrieve = async () => {
      const sessionInLocalStorage = {
        access: localStorage.getItem('superteam_access'),
        email: localStorage.getItem('superteam_email')
      }

      if (sessionInLocalStorage.access && sessionInLocalStorage.access !== undefined) {
        /*         console.table(sessionInLocalStorage)
                const compare = await compareWithDigestHex(sessionInLocalStorage.access)
                if (compare) { */
        manageUserLogged(true)
        manageUsernameLogged(sessionInLocalStorage.email)

        console.log(`Logged`)
      }
    }
    tryRetrieve()
  })

  return <UserLogged.Provider value={{ isUserLogged, manageUserLogged, usernameLogged, manageUsernameLogged, tryLogIn, loggingIn, triedWrongCredentials }}> {children} </UserLogged.Provider>;
}