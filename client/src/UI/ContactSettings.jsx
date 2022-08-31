import React, { useEffect, useState } from 'react'
import SettingsLogo from '../assets/images/settings.svg'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/ContactSettings.module.scss'
import { getUser } from '../utils/chatFetch'

const ContactSettings = ({user}) => {
    const [friend, setFriend] = useState({})

    useEffect(() => {
        getUser(user._id, setFriend)
    }, [user])

    return (
        <div className={st.chat_bottom}>
            <div>
                <img src={ProfileImage} alt='profile image' />
                <span>{ friend ? friend.userName : 'Username'}</span>
            </div>
            <button type='button'>
                <img src={SettingsLogo} alt='settings image' />
            </button>
        </div>
    )
}

export default ContactSettings