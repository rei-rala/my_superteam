import React, { createContext, useContext, useEffect, useState } from 'react';
import { SuperTeamManager } from './SuperTeamManagerContext';
import { UserLogged } from './UserLoggedContext';


import { database } from '../firebase/firebase';

export const ManageFirestore = createContext();

export const ManageFirestoreContext = ({ children }) => {
  const { superTeam, setSuperTeam } = useContext(SuperTeamManager)
  const { userInfo, areCredsValid } = useContext(UserLogged)
  const [loadingFB, setLoadingFB] = useState(false)

  const [triedRetrieving, setTriedRetrieving] = useState(true)

  useEffect(() => {
    const updatingTeamFirebase = async () => {
      setLoadingFB(true)
      const doc = database.collection('users').doc(userInfo.emailEncrypted)
      doc.set({ userTeam: superTeam })
        .finally(() => setLoadingFB(false))
    }

    if (userInfo.emailEncrypted && !triedRetrieving) {
      updatingTeamFirebase()
    }

  }, [superTeam, userInfo, triedRetrieving])


  useEffect(() => {
    const retrieveTeam = async () => {
      setLoadingFB(true)
      const user = database.collection("users").doc(userInfo.emailEncrypted);

      user
        .get()
        .then(userData => {
          if (userData.exists && userData.data() !== []) {
            return userData.data()
          }
          else throw new Error('No se recupero equipo de FB')
        })
        .then(superteamFB => {
          setSuperTeam(superteamFB.userTeam)
        })
        .catch(console.info)
        .finally(() => {
          setLoadingFB(false)
          setTriedRetrieving(false)
        })

    }

    if (areCredsValid && userInfo.emailEncrypted && triedRetrieving) {
      retrieveTeam()
    }
  }, [areCredsValid, userInfo, setSuperTeam, triedRetrieving])

  return <ManageFirestore.Provider value={{ loadingFB }}> {children} </ManageFirestore.Provider>;
}