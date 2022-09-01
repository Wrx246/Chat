import React from 'react'
import st from '../styles/ContactsOnline.module.scss'
import ContactImage from '../assets/images/contact.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUserName } from '../utils/chatFetch'
import { getNewConversation } from '../utils/contactsFetch'

const ContactsOnline = ({ onlineUsers, currentId, setCurrentChat, searchFriend, friends }) => {
    const [onlineFriends, setOnlineFriends] = useState([])

    // useEffect(() => {
    //     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
    // }, [friends, onlineUsers])


    return (
        <div
            className={st.contact_item}
            onClick={() => getNewConversation(currentId, friends._id, setCurrentChat)}>
            <img src={ContactImage} alt='contact image' />
            {friends ? <span>{friends.userName}</span> : <span>Contact name</span>}

        </div>
    )
}

export default ContactsOnline