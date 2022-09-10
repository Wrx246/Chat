import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../utils/chatFetch'
import SettingsLogo from '../../assets/images/settings.svg'
import LogoutLogo from '../../assets/images/logout.svg'
import ProfileImage from '../../assets/images/profile-image.svg'
import st from '../../styles/contacts/ContactSettings.module.scss'



const ContactSettings = ({ user, showSettings, setShowSettings }) => {
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
                <img src={user.avatar ? user.avatar.filePath : ProfileImage} alt="profile img" />
                <span>{friend ? friend.userName : "Username"}</span>
            </div>
            <div>
                <button type="button" onClick={() => setShowSettings(!showSettings)}>
                    <img src={SettingsLogo} alt="settings img" />
                </button>
                <button type="button" onClick={handleLogout}>
                    <img src={LogoutLogo} alt="settings img" />
                </button>
            </div>
        </div>
    )
}

export default ContactSettings