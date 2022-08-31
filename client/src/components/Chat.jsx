import React from 'react'
import st from '../styles/Chat.module.scss'
import ContactItem from '../UI/ContactItem'
import ContactSettings from '../UI/ContactSettings'
import MessageHeader from '../UI/MessageHeader'
import MessageInput from '../UI/MessageInput'
import MessageItem from '../UI/MessageItem'

const Chat = () => {

  return (
    <div className={st.chat_wrapper}>
      <div className={st.chat_contacts}>
        <div className={st.chat_header}>
          <h3>X-chat</h3>
          <input placeholder='Search for contacts' />
        </div>
        <div className={st.chat_body}>
          <ContactItem />
        </div>
        <ContactSettings />
      </div>
      <div className={st.message_wrapper}>
        <div className={st.message_header}>
          <MessageHeader />
          <div className={st.header_input}>
            <input placeholder='search' />
          </div>
        </div>
        <div className={st.message_body}>
          <MessageItem />
        </div>
        <MessageInput />
      </div>
    </div>
  )
}

export default Chat