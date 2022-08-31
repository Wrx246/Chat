import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import st from '../styles/Chat.module.scss'
import ContactItem from '../UI/ContactItem'
import ContactSettings from '../UI/ContactSettings'
import MessageHeader from '../UI/MessageHeader'
import MessageInput from '../UI/MessageInput'
import MessageItem from '../UI/MessageItem'
import { conversationFetch, getMessages } from '../utils/chatFetch'

const Chat = () => {
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef();

  const user = JSON.parse(localStorage.getItem('chat-user'))

  useEffect(() => {
    conversationFetch(user, setConversation)
  }, [user._id])

  useEffect(() => {
    getMessages(currentChat, setMessages)
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  return (
    <div className={st.chat_wrapper}>
      <div className={st.chat_contacts}>
        <div className={st.chat_header}>
          <h3>X-chat</h3>
          <input placeholder='Search for contacts' />
        </div>
        <div className={st.chat_body}>
          {conversation.map((c, index) => {
            return (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <ContactItem conversation={c} user={user} />
              </div>
            )
          })}
        </div>
        <ContactSettings user={user} />
      </div>
      <div className={st.message_wrapper}>
        <div className={st.message_header}>
          <MessageHeader />
          <div className={st.header_input}>
            <input placeholder='search' />
          </div>
        </div>
        <div className={st.message_body}>
          {currentChat ?
            <>
              {
                messages.map((message, index) => {
                  return (
                    <div key={index} ref={scrollRef}>
                      <MessageItem message={message} />
                    </div>
                  )
                })
              }
            </>
            : <span>Start talking with your friends</span>}
        </div>
        <MessageInput
          user={user}
          currentChat={currentChat}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
    </div>
  )
}

export default Chat