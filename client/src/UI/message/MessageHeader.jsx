import React, { useEffect, useState } from 'react'
import ProfileImage from '../../assets/images/profile-image.svg'
import st from '../../styles/message/MessageHeader.module.scss'
import { getUserData } from '../../utils/chatFetch'

const MessageHeader = ({ user, currentChat }) => {
    const [friend, setFriend] = useState({})

    useEffect(() => {
        let friendId = currentChat['members'].find((member) => member !== user._id)
        getUserData(friendId, setFriend)
    }, [currentChat, user])

    return (
        <div className={st.header_description}>
            <img src={friend.avatar ? friend.avatar.filePath : ProfileImage} alt="profile img" />
            <span>{friend.userName}</span>
            <p>{friend.email}</p>
        </div>
    )
}

export default MessageHeader