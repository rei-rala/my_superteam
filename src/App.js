import { useContext } from 'react';
import './styles/reset.scss';

import { Redirect, Route } from 'react-router';

/* import { ThemeContext } from './context/ThemeContext';
import ThemeToggler from './components/ThemeToggler/ThemeToggler'; */

import { UserLogged } from './context/UserLoggedContext';
import { SuperTeamManagerContext } from './context/SuperTeamManagerContext';

import Header from './components/Header/Header';
import Login from './components/Login/Login';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';
import HomePage from './components/HomePage/HomePage';

function App() {
  const { isUserLogged } = useContext(UserLogged)

  return (
    <>
      <Header />
      {
        isUserLogged
          ? <Redirect to='/test' />
          : <Redirect to='/login' />
      }


      {
        <>
          <Route exact path='/login'>
            <Login />
          </Route>

          <SuperTeamManagerContext>
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
          </SuperTeamManagerContext>
        </>
      }
    </>
  );
}

export default App;
