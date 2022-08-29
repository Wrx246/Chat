import React from 'react'
import { Link } from 'react-router-dom'
import st from '../styles/Form.module.scss'

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submit success')
}

const Registration = () => {
  return (
    <div className={st.registration}>
      <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Registration</h1>
          <input type='text' placeholder='Username' name='username' />
          <input type='email' placeholder='Email' name='email' />
          <input type='password' placeholder='Password' name='password' />
          <input type='password' placeholder='ConfirmPassword' name='confirmPassword' />
          <button type='submit'>Create account</button>
          <span>Already have account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Registration