import { React, useState } from 'react'
import st from '../../styles/contacts/ContactsOnline.module.scss'
import ContactImage from '../../assets/images/profile-image.svg'
import { getNewConversation } from '../../utils/contactsFetch'

const ContactsOnline = ({ onlineUsers, currentId, setCurrentChat, searchFriend, friends }) => {
    const [onlineFriends, setOnlineFriends] = useState([])

    // useEffect(() => {
    //     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
    // }, [friends, onlineUsers])


    return (
        <div
            className={st.contact_item}
            onClick={() => getNewConversation(currentId, friends._id, setCurrentChat)}>
            <img src={ContactImage} alt="contact img" />
            {friends ? <span>{friends.userName}</span> : <span>Contact name</span>}

        </div>
    )
}

export default ContactsOnline