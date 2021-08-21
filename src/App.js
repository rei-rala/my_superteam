import { useContext } from 'react';
import './styles/reset.scss';

/* import { ThemeContext } from './context/ThemeContext';
import ThemeToggler from './components/ThemeToggler/ThemeToggler'; */

import { UserLogged } from './context/UserLoggedContext';
import { SuperTeamManagerContext } from './context/SuperTeamManagerContext';

import Login from './components/Login/Login';
import LogOut from './components/Logout/Logout';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';
import HomePage from './components/HomePage/HomePage';

function App() {
  const { isUserLogged } = useContext(UserLogged)

  return (
    <>
      {
        !isUserLogged
          ? <Login />
          : <>
            <LogOut />
            <SuperTeamManagerContext>
              <HomePage />
              <SearchHeroPage />
            </SuperTeamManagerContext>
          </>
      }
    </>
    /*         <ThemeContext>
              <ThemeToggler>
          </ThemeToggler>
        </ThemeContext> */
  );
}

export default App;
