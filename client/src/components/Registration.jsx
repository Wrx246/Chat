import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import st from '../styles/Form.module.scss'
import { fetchRegistration } from '../utils/apiFetch';


const Registration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('chat-user')) {
      navigate('/')
    }
  }, [])

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'minimum 2 characters')
      .max(20, 'maximum 20 characters')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(5, 'minimum 5 characters')
      .max(20, 'maximum 20 characters')
      .required("This field is required"),
    changepassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  })


  return (
    <div className={st.registration}>
      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: '',
          changepassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => fetchRegistration(values, navigate)}
      >
        {({ errors, touched, }) => (
          <Form>
            <h1>Registration</h1>
            <div>
              <Field name="userName" placeholder='Username' />
              {errors.userName && touched.userName ? (
                <div className={st.registration_error}>{errors.userName}</div>
              ) : null}
            </div>

            <div>
              <Field name="email" type="email" placeholder='Email' />
              {errors.email && touched.email ?
                <div className={st.registration_error}>{errors.email}</div> : null}
            </div>

            <div>
              <Field name="password" type="password" placeholder='Password' />
              {errors.password && touched.password ?
                <div className={st.registration_error}>{errors.password}</div> : null}
            </div>

            <div>
              <Field name="changepassword" type="password" placeholder='Confirm password' />
              {errors.changepassword && touched.changepassword ?
                <div className={st.registration_error}>{errors.changepassword}</div> : null}
            </div>

            <button type="submit">Create account</button>
            <span>Already have account? <Link to='/login'>Login</Link></span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Registration

// const [username, setUsername] = useState('')
// const [email, setEmail] = useState('')
// const [password, setPassword] = useState('')
// const [confirmPassword, setConfirmPassword] = useState('')

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(username)
//   console.log(email)
//   console.log(password)
//   console.log(confirmPassword)
// }


{/* <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Registration</h1>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            name='username' />
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            name='email' />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            name='password' />
          <input
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='ConfirmPassword'
            name='confirmPassword' />
          <button type='submit'>Create account</button>
          <span>Already have account? <Link to='/login'>Login</Link></span>
        </form> */}