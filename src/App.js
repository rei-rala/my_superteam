import { useContext, useEffect } from 'react';
import './styles/reset.scss';

import { Redirect, Route, useLocation } from 'react-router';


import { UserLogged } from './context/UserLoggedContext';
import { SuperTeamManagerContext } from './context/SuperTeamManagerContext';
import { HoldSearchContext } from './context/HoldSearchContext';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';
import HomePage from './components/HomePage/HomePage';
import HeroDetails from './components/HeroDeails/HeroDetails';


function App() {
  const { isUserLogged } = useContext(UserLogged)
  const pageLocation = useLocation().pathname



  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { scrollTop() }, [pageLocation])

  return (
    <>
      <Route path='/'>
        {
          isUserLogged
            ? <Redirect to='/home' />
            : <Redirect to='/login' />
        }
      </Route>


      <Route exact path='/login'>
        <Login />
      </Route>

      <SuperTeamManagerContext>
        <Header />
        <HoldSearchContext>

          {
            pageLocation.slice(0, 5) === '/hero' &&
            <Route path='/hero/:idHero'>
              <HeroDetails />
            </Route>
          }


          <Route exact path='/test'>
            <HomePage />
            <SearchHeroPage />
          </Route>

          <Route exact path='/home'>
            <HomePage />
          </Route>

          <Route exact path='/search'>
            <SearchHeroPage />
          </Route>

        </HoldSearchContext>
        <Footer pageLocation={pageLocation} scrollTop={scrollTop} />
      </SuperTeamManagerContext>
    </>
  );
}

export default App;
