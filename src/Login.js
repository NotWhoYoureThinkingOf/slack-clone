import {Button} from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth, provider} from './firebase'
import {useStateValue} from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
  const [state, dispatch] = useStateValue()

  const signIn = () =>{
    // e.preventDefault();
    auth.signInWithPopup(provider)
    .then((result) => {
      console.log(result)
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      })
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://www.kansasfest.org/wp-content/uploads/slack.png" alt=""/>
        <h1>Sign in to Slack</h1>
        <p>slack-clone.slack.com</p>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  )
}

export default Login
