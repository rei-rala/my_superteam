import React, { createContext, useContext, useEffect, useState } from 'react';
import { SuperTeamManager } from './SuperTeamManagerContext';
import { UserLogged } from './UserLoggedContext';


import { database } from '../firebase/firebase';

export const ManageFirestore = createContext();

export const ManageFirestoreContext = ({ children }) => {
  const { superTeam, setSuperTeam } = useContext(SuperTeamManager)
  const { isUserLogged, usernameLogged, UENCRYPT } = useContext(UserLogged)

  const [forceUpdate, setForceUpdate] = useState(true)
  const [loadingFB, setLoadingFB] = useState(false)

  useEffect(() => {
    const updatingTeamFirebase = async () => {
      setLoadingFB(true)
      const doc = database.collection('users').doc(UENCRYPT)
      doc.set({ userTeam: superTeam })
    }

    if (isUserLogged && usernameLogged && usernameLogged !== '' && UENCRYPT && !forceUpdate) {
      updatingTeamFirebase()
        .then(() => setLoadingFB(false))
    }
  }, [superTeam, isUserLogged, usernameLogged, UENCRYPT, forceUpdate])



  useEffect(() => {
    const retrieveTeam = async () => {
      setLoadingFB(true)
      const user = database.collection("users").doc(UENCRYPT);
      return user
        .get()
        .then(userData => {
          if (userData.exists && userData.data() !== []) {
            return userData.data()
          }
          else throw new Error('No se obtuvo equipo de FB')
        })
        .then(superteamFB => {
          setSuperTeam(superteamFB.userTeam)
        })
        .catch(console.info)
    }
    if (isUserLogged && usernameLogged && UENCRYPT && forceUpdate) {
      retrieveTeam()
        .then(() => setForceUpdate(false))
        .then(() => setLoadingFB(false))
    }

  }, [superTeam, setSuperTeam, isUserLogged, usernameLogged, UENCRYPT, forceUpdate])

  return <ManageFirestore.Provider value={{ loadingFB, setForceUpdate }}> {children} </ManageFirestore.Provider>;
}