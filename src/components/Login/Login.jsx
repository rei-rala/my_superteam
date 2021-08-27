import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';
import './login.scss'

const Login = () => {
  const { tryLogIn, loggingIn, triedWrongCredentials } = useContext(UserLogged)


  return (
    <section className='logInSection'>

        {triedWrongCredentials ? <h2>Credenciales incorrectas</h2> : null}
      <form onSubmit={tryLogIn}>

        <div className="loginGroup">
          <label htmlFor="userEmail">E-mail</label>
          <input type="email" id='userEmail' name='userEmail' required />
        </div>

        <div className="loginGroup">
          <label htmlFor="userPassword">Password</label>
          <input type="password" id='userPassword' name='userPassword' required />
        </div>

        {loggingIn || triedWrongCredentials ? <button disabled className='workingButton'>Espere un momento</button> : <button>Iniciar</button>}
      </form>

    </section>
  )
}

export default Login