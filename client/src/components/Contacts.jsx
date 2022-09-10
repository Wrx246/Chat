import React from 'react'
import Logo from '../assets/images/logo.svg'
import st from '../styles/Chat.module.scss'
import ContactItem from '../UI/contacts/ContactItem'
import ContactSettings from '../UI/contacts/ContactSettings'
import ContactSlider from '../UI/contacts/ContactSlider'
import SearchContacts from '../UI/contacts/SearchContacts'

const Contacts = ({
    contactsStyles, searchFriend, searchContacts, 
    friends, showMembers, setShowMembers, user, setCurrentChat,
    showContacts, setShowContacts, conversation, showSettings, setShowSettings}) => {
    return (
        <div className={contactsStyles.join(' ')}>
            <div className={st.chat_header}>
                <div className={st.chat_logo}>
                    <img src={Logo} alt="logo img" />
                    <h3>X-chat</h3>
                </div>
                <input
                    value={searchFriend}
                    onChange={searchContacts}
                    type="text"
                    placeholder="Search contacts" />
            </div>
            <div className={st.chat_body}>
                {friends && searchFriend !== '' &&
                    <>
                        <ContactSlider
                            text="Search members"
                            showContacts={showMembers}
                            setShowContacts={setShowMembers} />
                        <SearchContacts
                            currentId={user._id}
                            friends={friends}
                            setCurrentChat={setCurrentChat} />
                    </>
                }
                {/* <span>Online members</span> */}
                {/* {[friends].map((f, index) => {
            return (
              <ContactsOnline
                key={index}
                friends={friends}
                searchFriend={searchFriend}
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat} />
            )
          })} */}
                < hr />
                <ContactSlider
                    text="Members"
                    showContacts={showContacts}
                    setShowContacts={setShowContacts} />
                {showContacts &&
                    <>
                        {conversation.map((c, index) => {
                            return (
                                <div key={index} onClick={() => setCurrentChat(c)}>
                                    <ContactItem conversation={c} user={user} />
                                </div>
                            )
                        })}
                    </>
                }
            </div>
            <ContactSettings user={user} showSettings={showSettings} setShowSettings={setShowSettings} />
        </div>
    )
}

export default Contacts