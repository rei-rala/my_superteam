import React, { createContext, useState, useEffect } from 'react';

export const UserLogged = createContext();

export const UserLoggedContext = ({ children }) => {
  const [isUserLogged, setUserLogged] = useState(false)

  const [usernameLogged, setUsernameLogged] = useState('')
  const [shortUsernameLogged, setShortUsernameLogged] = useState('')

  const [userInfo, setUserInfo] = useState({})

  const [loggingIn, setLoggingIn] = useState(false)
  const [triedWrongCredentials, setTriedWrongCredentials] = useState(false);

  const axios = require('axios').default

  const tryLogIn = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const credentials = {
      email: ev.target.userEmail.value,
      password: ev.target.userPassword.value
    }

    if (!loggingIn) {
      setLoggingIn(true)
      setUserInfo(credentials)
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()

    const logIn = async () => {
      setLoggingIn(true)

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
            setUsernameLogged(userInfo.email)

            const shortUsername = (userInfo.email).split('@')[0]
            setShortUsernameLogged(
              (
                shortUsername.length > 12
                  ? shortUsername.slice(0, 9) + '...'
                  : shortUsername
              ).toUpperCase()
            )
            return true
          }
        })
        .catch(err => {
          setTriedWrongCredentials(true)
        })
        .finally(validLogIn => {
          setLoggingIn(false)
          if (validLogIn) {
            setUserLogged(true)
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
        setTriedWrongCredentials(false)
        setUserInfo({})
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
        setUserLogged(true)
        setUsernameLogged(sessionInLocalStorage.email)

        const shortUsername = (sessionInLocalStorage.email).split('@')[0]
        setShortUsernameLogged(
          (
            shortUsername.length > 12
              ? shortUsername.slice(0, 9) + '...'
              : shortUsername
          ).toUpperCase()
        )
      }
    }
    tryRetrieve()
  })

  return <UserLogged.Provider
    value={{
      isUserLogged, setUserLogged,
      usernameLogged, setUsernameLogged,
      shortUsernameLogged, setShortUsernameLogged,
      loggingIn, tryLogIn, triedWrongCredentials
    }}
  >
    {children}
  </UserLogged.Provider>;
}