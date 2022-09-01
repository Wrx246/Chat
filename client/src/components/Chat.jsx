import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
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
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const scrollRef = useRef();

  const user = JSON.parse(localStorage.getItem('chat-user'))

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
      console.log(data)
    })
  }, [messages])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', (users) => {
      // console.log(users)
    })
  }, [user])


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
          socket={socket}
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