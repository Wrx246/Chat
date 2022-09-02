import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../utils/chatFetch'
import SettingsLogo from '../assets/images/settings.svg'
import LogoutLogo from '../assets/images/logout.svg'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/ContactSettings.module.scss'



const ContactSettings = ({ user }) => {
    const navigate = useNavigate();
    const [friend, setFriend] = useState({})

    useEffect(() => {
        getUser(user._id, setFriend)
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('chat-user');
        navigate('/login')
    }

    return (
        <div className={st.chat_bottom}>
            <div>
                <img src={ProfileImage} alt='profile image' />
                <span>{friend ? friend.userName : 'Username'}</span>
            </div>
            <div>
                <button type='button'>
                    <img src={SettingsLogo} alt='settings image' />
                </button>
                <button type='button' onClick={handleLogout}>
                    <img src={LogoutLogo} alt='settings image' />
                </button>
            </div>
        </div>
    )
}

export default ContactSettings