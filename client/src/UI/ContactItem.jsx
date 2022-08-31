import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ContactImage from '../assets/images/contact.png'
import st from '../styles/ContactItem.module.scss'
import { getUser } from '../utils/chatFetch'

const ContactItem = ({conversation, user}) => {
    const [friend, setFriend] = useState({})

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== user._id);
        getUser(friendId, setFriend);
    }, [conversation, user])



    return (
        <div className={st.contact_item}>
            <img src={ContactImage} alt='contact image' />
            <span>{friend.userName}</span>
        </div>
    )
}

export default ContactItem