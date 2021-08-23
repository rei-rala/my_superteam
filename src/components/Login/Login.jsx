import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';
import './login.scss'

const Login = () => {
  const { tryLogIn, loggingIn, triedWrongCredentials } = useContext(UserLogged)


  return (
    <section className='logInSection'>

      <form onSubmit={tryLogIn}>

        <div className="loginGroup">
          <label htmlFor="userEmail">E-mail</label>
          <input type="email" id='userEmail' name='userEmail' required />
        </div>

        <div className="loginGroup">
          <label htmlFor="userPassword">Password</label>
          <input type="password" id='userPassword' name='userPassword' required />
        </div>

        {loggingIn || triedWrongCredentials ? <button disabled>Iniciar</button> : <button>Iniciar</button>}
      </form>

      {triedWrongCredentials ? 'Credenciales incorrectas' : null}
    </section>
  )
}

export default Login