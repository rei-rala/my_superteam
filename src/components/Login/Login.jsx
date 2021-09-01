import React, { useContext } from 'react'
import { UserLogged } from '../../context/UserLoggedContext';
import './login.scss'
import Loading from '../Loading/Loading'

const Login = () => {
  const { tryLogIn, loggingIn, triedWrongCredentials } = useContext(UserLogged)


  return (
    <section className='logInSection'>

      {triedWrongCredentials.error ? <h2>{`Credenciales incorrectas: ${triedWrongCredentials.type} ${triedWrongCredentials.error}`}</h2> : null}
      <form onSubmit={tryLogIn}>

        <div className="loginGroup">
          <label htmlFor="userEmail">E-mail</label>
          <input type="email" id='userEmail' name='userEmail' placeholder='Ingrese Email' required />
        </div>

        <div className="loginGroup">
          <label htmlFor="userPassword">Password</label>
          <input type="password" id='userPassword' name='userPassword' placeholder='Ingrese Password' required />
        </div>

        {loggingIn || triedWrongCredentials.error ? <button disabled className='workingButton'>Espere un momento</button> : <button>Iniciar</button>}

      </form>

      {(loggingIn || triedWrongCredentials.error) && <Loading />}

    </section>
  )
}

export default Login