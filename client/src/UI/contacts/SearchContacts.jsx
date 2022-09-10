import React from 'react'
import st from '../../styles/contacts/ContactsOnline.module.scss'
import ContactImage from '../../assets/images/profile-image.svg'
import { getNewConversation } from '../../utils/contactsFetch'

const SearchContacts = ({currentId, friends, setCurrentChat}) => {
    return (
        <div className={st.contact_item}
            onClick={() => getNewConversation(currentId, friends._id, setCurrentChat)}>
            <img src={friends.avatar ? friends.avatar.filePath : ContactImage} alt="contact img" />
            <span>{friends.userName}</span>

        </div>
    )
}

export default SearchContacts