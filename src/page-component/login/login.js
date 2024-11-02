import ZenAI from '../../resource/icon.svg'
import arrow from '../../resource/arrow-up.svg'
import './login.css';
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userdata } from './loginAssets.js'

export default function Login() {
  // eslint-disable-next-line
  const [username, setUsername] = useState()
  // eslint-disable-next-line
  const [password, setPassword] = useState()

  const usernameFocus = useRef(null);
  const navigate = useNavigate()

  useEffect (() => {
    usernameFocus.current.focus()
  }, [])

  const handleLogs = (ev) => {
    ev.preventDefault()
    updateLogin('account')
  }

  const updateLogin = (type) => {
    if (type === 'asGuest') {
      localStorage.clear()
      navigate('/zenai/AI', {replace : true})
    } else if(type === 'account') {
      var usernameValid = userdata.find((infoValidation) => infoValidation.username === username)
      var passwordValid = userdata.find((infoValidation) => infoValidation.username === username && infoValidation.password === password)
      if (usernameValid) {
        document.getElementById('input-username').style.border = '1px solid rgb(232, 232, 232, 0.5)'
        if (passwordValid) {
          document.getElementById('input-password').style.border = '1px solid rgb(232, 232, 232, 0.5)'
          localStorage.clear()
          localStorage.setItem('isLoggedIn-zenai', true)
          localStorage.setItem('username-zenai', username)
          console.log(localStorage.getItem('isLoggedIn-zenai'), localStorage.getItem('username-zenai'))
          navigate('/zenai/AI', {replace : true})
        } else {
          document.getElementById('input-password').style.border = '1px solid red'
        }
      } else {
        document.getElementById('input-username').style.border = '1px solid red'
      }
    }
  }

  return (
    <>
      <div id="base-div-wrapper">
        <form onSubmit={handleLogs}>
          <img src={ZenAI} alt={ZenAI}/>
          <div id='login-input-field'>
            <input
              type='text'
              id='input-username'
              ref={usernameFocus}
              placeholder='Username'
              onInput={(e) => setUsername(e.target.value)}
              autoComplete='off'
            />
            <div id='password-element-wrapper'>
              <input 
                type='password'
                id='input-password'
                placeholder='Password'
                onInput={(e) => setPassword(e.target.value)}
              />
              <button type='submit' id='submit-loginInfo' onClick={handleLogs}><img src={arrow} alt={arrow}/></button>
            </div>
          </div>
          <span onClick={() => updateLogin('asGuest')}>Enter as guest</span>
        </form>
      </div>
    </>
  )
}