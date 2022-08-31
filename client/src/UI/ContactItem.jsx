import React from 'react'
import ContactImage from '../assets/images/contact.png'
import st from '../styles/ContactItem.module.scss'

const ContactItem = () => {
    return (
        <div className={st.contact_item}>
            <img src={ContactImage} alt='contact image' />
            <span>Wendy Cambell</span>
        </div>
    )
}

export default ContactItem