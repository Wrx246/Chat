import { React, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import st from '../styles/Form.module.scss'
import { fetchLogin } from '../utils/authFetch'


const Login = () => {
  const navigate = useNavigate();



  useEffect(() => {
    if(localStorage.getItem('chat-user')) {
      navigate('/')
    }
  }, [])

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required("This field is required"),
  })

  return (
    <div className={st.registration}>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => fetchLogin(values, navigate)}
      >
        {({ errors, touched, }) => (
          <Form>
            <h1>Login</h1>
            <div>
              <Field name="userName" placeholder='Username' />
              {errors.userName && touched.userName ? (
                <div className={st.registration_error}>{errors.userName}</div>
              ) : null}
            </div>

            <div>
              <Field name="password" type="password" placeholder='Password' />
              {errors.password && touched.password ?
                <div className={st.registration_error}>{errors.password}</div> : null}
            </div>

            <button type="submit">Login in</button>
            <span>No account? <Link to='/registration'>Sign up</Link></span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login;
