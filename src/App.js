import { useContext } from 'react';
import './App.css';
import { UserLogged } from './context/UserLoggedContext';

import Login from './components/Login/Login';
import LogOut from './components/Logout/Logout';

import SearchHeroPage from './components/SearchHeroPage/SearchHeroPage';


function App() {
  const { isUserLogged } = useContext(UserLogged)

  return (
    <>
      {
        !isUserLogged
          ? <Login />
          : <>
            <SearchHeroPage />
            <LogOut />

          </>
      }
    </>
  );
}

export default App;
