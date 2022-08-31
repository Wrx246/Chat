import React from 'react'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/MessageHeader.module.scss'

const MessageHeader = () => {
    return (
        <div className={st.header_decription}>
            <img src={ProfileImage} alt='profile image' />
            <span>Josh California</span>
            <p>josh.cal@gmail.com</p>
        </div>
    )
}

export default MessageHeader