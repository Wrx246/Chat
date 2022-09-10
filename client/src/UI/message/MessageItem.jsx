import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ProfileImage from '../../assets/images/profile-image.svg'
import Bin from '../../assets/images/Bin.svg'
import Pencil from '../../assets/images/Pencil.svg'
import Push from '../../assets/images/push.svg'
import Reply from '../../assets/images/Reply.svg'
import Smile from '../../assets/images/smile.svg'
import st from '../../styles/message/MessageItem.module.scss'
import { deleteMessage, getUser, updateMessage } from '../../utils/chatFetch'

const MessageItem = ({ message, user }) => {
    const [friend, setFriend] = useState({})
    const [showSettings, setShowSettings] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [editMessage, setEditMessage] = useState(false)

    const { _id, text, sender, messageImage } = message;
    const [changeMessage, setChangeMessage] = useState(text)

    useEffect(() => {
        getUser(sender, setFriend)
    }, [message, sender])


    const handleHover = (e) => {
        e.preventDefault();
        setShowSettings(!showSettings)
    }

    const handleRemove = (e) => {
        e.preventDefault();
        deleteMessage(message, setShowDelete)
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateMessage(_id, changeMessage, setEditMessage, text)
    }

    if (showDelete === true) {
        return (
            <div className={st.message_item}>
                <img src={user.avatar ? user.avatar.filePath : ProfileImage} alt="profile img" />
                <div className={st.message_body}>
                    <span>{friend ? friend.userName : 'Username'}</span>
                    <p>Message deleted!</p>
                </div>
            </div>
        )
    }
    // Сделать обновление функци удаления и апдейта сообщений на уровне сокета
    return (
        <div className={st.message_item} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            {sender === user._id ?
                <img src={user.avatar ? user.avatar.filePath : ProfileImage} alt="profile img" /> :
                <img src={friend.avatar ? friend.avatar.filePath : ProfileImage} alt="profile img" />
            }
            <div className={st.message_body}>
                <span>{friend ? friend.userName : 'Username'}</span>
                <p>
                    {editMessage ?
                        <input
                            type="text"
                            value={changeMessage}
                            onChange={(e) => setChangeMessage(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdate(e)
                                }
                            }} /> :
                        <>
                            {text}
                            {messageImage &&
                                <img src={messageImage.filePath} alt="message img" />}
                        </>
                    }
                </p>
            </div>
            {showSettings &&
                <div className={st.message_settings}>
                    <img src={Smile} alt="smile" />
                    <img src={Reply} alt="reply" />
                    <img src={Push} alt="push" />
                    <img src={Pencil} alt="pencil" onClick={() => setEditMessage(!editMessage)} />
                    <img src={Bin} alt="bin" onClick={handleRemove} />
                </div>
            }
        </div>
    )
}

export default MessageItem