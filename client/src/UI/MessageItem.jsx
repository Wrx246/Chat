import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/MessageItem.module.scss'
import { getUser } from '../utils/chatFetch';

const MessageItem = ({message}) => {
    const [friend, setFriend] = useState({})
    const {text, sender} = message;

    useEffect(() => {
        getUser(sender, setFriend)
    }, [message])

    return (
        <div className={st.message_item}>
            <img src={ProfileImage} alt="profile img" />
            <div>
                <span>{ friend ? friend.userName : 'Username'}</span>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default MessageItem