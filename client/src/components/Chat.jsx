import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import st from '../styles/Chat.module.scss'
import ContactItem from '../UI/ContactItem'
import ContactSettings from '../UI/ContactSettings'
import ContactsOnline from '../UI/ContactsOnline'
import MessageHeader from '../UI/MessageHeader'
import MessageInput from '../UI/MessageInput'
import MessageItem from '../UI/MessageItem'
import SearchContacts from '../UI/SearchContacts'
import { conversationFetch, getMessages, getUserName } from '../utils/chatFetch'

const Chat = () => {
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [searchFriend, setSearchFriend] = useState([])
  const [friends, setFriends] = useState({})
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
      // setOnlineUsers(
      //   user.filter((f) => users.some((u) => u.userId === f))
      // )
    })
  }, [user])


  useEffect(() => {
    conversationFetch(user, setConversation)
  }, [user._id])

  useEffect(() => {
    getMessages(currentChat, setMessages)
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    getUserName(searchFriend, setFriends)
    console.log(friends)
  }, [searchFriend])


  return (
    <div className={st.chat_wrapper}>
      <div className={st.chat_contacts}>
        <div className={st.chat_header}>
          <h3>X-chat</h3>
          <input
            value={searchFriend}
            onChange={(e) => setSearchFriend(e.target.value)}
            type='text'
            placeholder='Search for contacts' />
        </div>
        <div className={st.chat_body}>

          {searchFriend &&
            <>
              <span>Search members</span>
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
          <span>Members</span>
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
          <MessageHeader conversation={conversation} user={user} />
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