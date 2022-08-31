import React from 'react'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/MessageItem.module.scss'

const MessageItem = () => {
    return (
        <div className={st.message_item}>
            <img src={ProfileImage} alt='profile image' />
            <div>
                <span>Josh California</span>
                <p>
                    text text text
                    text texzt text text
                </p>
            </div>
        </div>
    )
}

export default MessageItem