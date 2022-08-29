import React from 'react'
import { Link } from 'react-router-dom'
import st from '../styles/Form.module.scss'

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submit success')
}

const Login = () => {
  return (
    <div className={st.registration}>
      <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Login account</h1>
          <input type='text' placeholder='Username' name='username' />
          <input type='password' placeholder='Password' name='password' />
          <button type='submit'>Login in</button>
          <span>No account? <Link to='/registration'>Sign up</Link></span>
      </form>
    </div>
  )
}

export default Login;