import { useContext, useEffect } from 'react';
import './styles/general.scss';

import { Redirect, Route, useLocation } from 'react-router';


import { UserLogged } from './context/UserLoggedContext';
import { SuperTeamManagerContext } from './context/SuperTeamManagerContext';
import { HoldSearchContext } from './context/HoldSearchContext';
import { ManageFirestoreContext } from './context/ManageFirestore';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import LoadingFBWatch from './components/LoadingFBWatch/LoadingFBWatch';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';
import HomePage from './components/HomePage/HomePage';
import HeroDetailsPage from './components/HeroDeailsPage/HeroDetailsPage';


function App() {
  const { isUserLogged } = useContext(UserLogged)
  const pageLocation = useLocation().pathname

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollTop()
  }, [pageLocation])

  return (
    <>
      <Route path='/'>
        {
          isUserLogged
            ? <Redirect to='/home' />
            : <Redirect to='/login' />
        }
      </Route>


      <Route path='/login'>
        {
          isUserLogged
            ? <Redirect to='/home' />
            : <Login />
        }
      </Route>

      <SuperTeamManagerContext>
        <Header />
        <HoldSearchContext>
          <ManageFirestoreContext>

            <LoadingFBWatch />
            <Route path='/hero/:idHero'>
              {
                isUserLogged
                  ? <HeroDetailsPage />
                  : <Redirect to='/login' />
              }
            </Route>

            <Route path='/test'>
              {
                isUserLogged
                  ? <>
                    <HomePage />
                    <SearchHeroPage />
                  </>
                  : <Redirect to='/login' />
              }
            </Route>

            <Route path='/home'>
              {
                isUserLogged
                  ? <HomePage />
                  : <Redirect to='/login' />
              }
            </Route>

            <Route path='/search'>
              {
                isUserLogged
                  ? <SearchHeroPage />
                  : <Redirect to='/login' />
              }
            </Route>

          </ManageFirestoreContext>
        </HoldSearchContext>
        <Footer pageLocation={pageLocation} scrollTop={scrollTop} />
      </SuperTeamManagerContext>
    </>
  );
}

export default App;
