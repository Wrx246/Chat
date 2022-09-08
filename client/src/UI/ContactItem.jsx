import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ContactImage from '../assets/images/profile-image.svg'
import Close from '../assets/images/close.svg'
import st from '../styles/ContactItem.module.scss'
import { getUser } from '../utils/chatFetch'
import { deleteConversation } from '../utils/contactsFetch'

const ContactItem = ({conversation, user}) => {
    const [friend, setFriend] = useState({})

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== user._id);
        getUser(friendId, setFriend);
    }, [conversation, user])


    return (
        <div className={st.contact_item}>
            <img src={friend.avatar ? friend.avatar.filePath : ContactImage} alt="contact img" />
            <span>{friend.userName}</span>
            <button onClick={() => deleteConversation(conversation)}>
                <img src={Close} alt="close button" />
            </button>
        </div>
    )
}

export default ContactItem