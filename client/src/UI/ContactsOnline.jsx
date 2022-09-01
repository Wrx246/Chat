import React from 'react'
import st from '../styles/ContactsOnline.module.scss'
import ContactImage from '../assets/images/contact.png'
import { useState } from 'react'
import { useEffect } from 'react'

const ContactsOnline = () => {

    return (
        <div className={st.contact_item}>
            <img src={ContactImage} alt='contact image' />
            <span>Contact name</span>
        </div>
    )
}

export default ContactsOnline