import { API } from './apiConsts'
import { fetchAccount } from './userFetch'


export const fetchRegistration = async (values, navigate, setServerError) => {
    const { userName, password, email } = values;
    try {
        await API.post('auth/registration', {
            userName,
            password,
            email,
        }).then((res) => {
            localStorage.setItem('chat-user', JSON.stringify(res.data.user));
            navigate('/');
        })
    } catch (error) {
        setServerError(error.response.data.message)
    }
}

export const fetchLogin = async (values, navigate, setServerError) => {
    const { userName, password } = values;
    try {
        await API.post('auth/login', {
            userName,
            password,
        }).then((res) => {
            fetchAccount(res.data.user['_id'])
                .then(() => {
                    navigate('/');
                })
        })
    } catch (error) {
        setServerError(error.response.data.message)
    }
}