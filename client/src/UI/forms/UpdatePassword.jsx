import { React, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import st from '../../styles/UpdateData.module.scss'
import { updatePassword } from '../../utils/userFetch'


const UpdatePassword = ({ user, setCompletePassword }) => {
    const [serverError, setServerError] = useState('');

    const userId = user._id;

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
        newPassword: Yup.string()
            .required('This field is required'),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => updatePassword(userId, values, setServerError, setCompletePassword)}
            >
                {({ errors, touched, }) => (
                    <Form>
                        <div>
                            <Field name="password" placeholder="Old password" />
                            {serverError !== '' ? <div className={st.error_body}>{serverError}</div> 
                            : null}
                            {errors.password && touched.password ? (
                                <div className={st.error_body}>{errors.password}</div>
                            ) : null}
                        </div>

                        <div>
                            <Field name="newPassword" type="password" placeholder="New password" />
                            {errors.newPassword && touched.newPassword ?
                                <div className={st.error_body}>{errors.newPassword}</div>
                                : null}
                        </div>
                        <button type="submit">
                            save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UpdatePassword;