import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ProfileImage from '../assets/images/profile-image.png'
import Bin from '../assets/images/Bin.svg'
import Pencil from '../assets/images/Pencil.svg'
import Push from '../assets/images/push.svg'
import Reply from '../assets/images/Reply.svg'
import Smile from '../assets/images/smile.svg'
import st from '../styles/MessageItem.module.scss'
import { getUser } from '../utils/chatFetch'

const MessageItem = ({ message }) => {
    const [friend, setFriend] = useState({})
    const [showSettings, setShowSettings] = useState(false)
    const { text, sender, messageImage } = message;

    useEffect(() => {
        getUser(sender, setFriend)
    }, [message])


    const handleHover = (e) => {
        e.preventDefault();
        setShowSettings(!showSettings)
    }

    return (
        <div className={st.message_item} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <img src={ProfileImage} alt="profile img" />
            <div className={st.message_body}>
                <span>{friend ? friend.userName : 'Username'}</span>
                <p>
                    {text}
                    {messageImage &&
                        <img src={messageImage.filePath} alt="message img" />}
                </p> 
            </div>
            {showSettings &&
                <div className={st.message_settings}>
                    <img src={Smile} alt="smile" />
                    <img src={Reply} alt="reply" />
                    <img src={Push} alt="push" />
                    <img src={Pencil} alt="pencil" />
                    <img src={Bin} alt="bin" />
                </div>
            }
        </div>
    )
}

export default MessageItem