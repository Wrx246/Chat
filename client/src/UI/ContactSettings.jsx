import React from 'react'
import SettingsLogo from '../assets/images/settings.svg'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/ContactSettings.module.scss'

const ContactSettings = () => {
    return (
        <div className={st.chat_bottom}>
            <div>
                <img src={ProfileImage} alt='profile image' />
                <span>Brit Ferguson</span>
            </div>
            <button type='button'>
                <img src={SettingsLogo} alt='settings image' />
            </button>
        </div>
    )
}

export default ContactSettings