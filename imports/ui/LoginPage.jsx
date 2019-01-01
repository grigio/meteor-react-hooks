
import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../utils/useUser'

export default function () {
  const [currentUser, loginWithPassword, logout] = useUser()

  function onSubmit(ev) {
    ev.preventDefault()
    const username = ev.target.username.value
    const password = ev.target.password.value

    console.log('try login')
    loginWithPassword(username, password)
  }

  return (
    <div id="login page">
      {/* <Link to="/home">Home</Link> Login */}
      <p>
        ({currentUser ? currentUser.username : 'no user active'})
      </p>
      <form onSubmit={onSubmit}>
        <input name="username" type="text" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <button>Login</button>
      </form>
      <button onClick={() => logout()}>Logout</button>

    </div>
  )
}