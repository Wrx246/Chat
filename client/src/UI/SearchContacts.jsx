import React from 'react'
import st from '../styles/ContactsOnline.module.scss'
import ContactImage from '../assets/images/contact.png'
import { getNewConversation } from '../utils/contactsFetch'

const SearchContacts = ({currentId, friends, setCurrentChat}) => {
    return (
        <div className={st.contact_item}
            onClick={() => getNewConversation(currentId, friends._id, setCurrentChat)}>
            <img src={ContactImage} alt='contact image' />
            <span>{friends.userName}</span>

        </div>
    )
}

export default SearchContacts