import React, { useEffect, useState } from 'react'
import ProfileImage from '../assets/images/profile-image.png'
import st from '../styles/MessageHeader.module.scss'
import { getUser } from '../utils/chatFetch'

const MessageHeader = ({user, currentChat }) => {
    const [friend, setFriend] = useState({})


    useEffect(() => {
        let friendId = currentChat['members'].find((member) => member !== user._id)
        getUser(friendId, setFriend)
    }, [currentChat, user])

    return (
        <div className={st.header_decription}>
            <img src={ProfileImage} alt='profile image' />
            <span>{friend.userName}</span>
            <p>{friend.email}</p>
        </div>
    )
}

export default MessageHeader