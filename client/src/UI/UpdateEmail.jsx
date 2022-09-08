import { React, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import st from '../styles/UpdateData.module.scss'
import { updateEmail } from '../utils/userFetch'


const UpdateEmail = ({ user, setCompleteEmail }) => {
    const [serverError, setServerError] = useState('');

    const userId = user._id;

    const SignupSchema = Yup.object().shape({
        newEmail: Yup.string()
            .required('Required'),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    newEmail: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => updateEmail(userId, values, setServerError, setCompleteEmail)}
            >
                {({ errors, touched, }) => (
                    <Form>
                        <div>
                            <Field name="newEmail" placeholder="New email" />
                            {serverError !== '' ? <div className={st.error_body}>{serverError}</div> 
                            : null}
                            {errors.newEmail && touched.newEmail ? (
                                <div className={st.error_body}>{errors.newEmail}</div>
                            ) : null}
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

export default UpdateEmail;