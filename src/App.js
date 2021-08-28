import { useContext } from 'react';
import './styles/reset.scss';

import { Redirect, Route } from 'react-router';


import { UserLogged } from './context/UserLoggedContext';
import { SuperTeamManagerContext } from './context/SuperTeamManagerContext';

import Header from './components/Header/Header';
import Login from './components/Login/Login';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

function App() {
  const { isUserLogged } = useContext(UserLogged)

  return (
    <>
      {

        isUserLogged
          ? <Redirect to='/test' />
          : <Redirect to='/login' />
      }

      <Route exact path='/'>
        {
          isUserLogged
            ? <Redirect to='/test' />
            : <Redirect to='/login' />
        }
      </Route>


      <Route exact path='/login'>
        <Login />
      </Route>

      <SuperTeamManagerContext>
        <Header />

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


        <Footer />
      </SuperTeamManagerContext>
    </>
  );
}

export default App;
