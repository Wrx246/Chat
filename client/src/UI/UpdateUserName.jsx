import { React, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import st from '../styles/UpdateData.module.scss'
import { updateUserName } from '../utils/userFetch'


const UpdateUserName = ({ user, setCompleteUserName }) => {
    const [serverError, setServerError] = useState('');

    const userId = user._id;

    const SignupSchema = Yup.object().shape({
        newUserName: Yup.string()
            .required('Required'),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    newUserName: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => updateUserName(userId, values, setServerError, setCompleteUserName)}
            >
                {({ errors, touched, }) => (
                    <Form>
                        <div>
                            <Field name="newUserName" placeholder="New name" />
                            {serverError !== '' ? <div className={st.error_body}>{serverError}</div> 
                            : null}
                            {errors.newUserName && touched.newUserName ? (
                                <div className={st.error_body}>{errors.newUserName}</div>
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

export default UpdateUserName;