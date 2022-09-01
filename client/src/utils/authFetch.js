import { API } from "./apiConsts"


export const fetchRegistration = async (values, navigate) => {
    const { userName, password, email } = values;
    const { data } = await API.post(`auth/registration`, {
        userName,
        password,
        email,
    }).catch(err => {
        console.log("error:", err)
    })

    if(data.status === false) {
        console.log(data.message)
    }
    if(data.status === true) {
        localStorage.setItem('chat-user', JSON.stringify(data.user));
        navigate('/');
    }
}

export const fetchLogin = async (values, navigate) => {
    const { userName, password } = values;
    const { data } = await API.post(`auth/login`, {
        userName,
        password,
    }).catch(err => {
        console.log("error:", err)
    })

    if(data.status === false) {
        console.log(data.message)
    }
    if(data.status === true) {
        localStorage.setItem('chat-user', JSON.stringify(data.user)); // убрать тут аксес токен, т.к. приходят разные данные
        navigate('/');
    }
}