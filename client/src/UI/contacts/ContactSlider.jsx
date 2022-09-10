import React from 'react'
import st from '../../styles/contacts/ContactSlider.module.scss'
import CollapseOpen from '../../assets/images/collapse-open.svg'
import CollapseClosed from '../../assets/images/collapse-closed.svg'

const ContactSlider = ({showContacts, setShowContacts, text}) => {
    return (
        <div className={st.contacts_slider} onClick={() => setShowContacts(!showContacts)}>
            {showContacts ? <img src={CollapseOpen} alt="open arrow" />
                : <img src={CollapseClosed} alt="close arrow" />}
            <span>{text}</span>
        </div>
    )
}

export default ContactSlider