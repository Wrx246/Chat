import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useDebounce } from '../hooks/useDebounce'
import st from '../styles/Chat.module.scss'
import { conversationFetch, getMessages, getUserName } from '../utils/chatFetch'
import UserSettings from '../UI/UserSettings'
import Contacts from '../components/Contacts'
import Message from '../components/Message'

const Chat = () => {
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [showContacts, setShowContacts] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [searchFriend, setSearchFriend] = useState('')
  const [friends, setFriends] = useState({})
  const [showSearch, setShowSearch] = useState(false)

  const [closeChat, setCloseChat] = useState(false)

  const [imageData, setImageData] = useState(null)

  const [showSettings, setShowSettings] = useState(false)

  const socket = useRef()
  const scrollRef = useRef();

  const messageStyles = [st.message_wrapper]
  const contactsStyles = [st.chat_contacts]

  useEffect(() => {
    if (closeChat && currentChat === null) {
      messageStyles.pop()
      contactsStyles.push(st.chat_contacts)
    } else {
      contactsStyles.pop()
      messageStyles.push(st.message_wrapper)
    }
  }, [messageStyles, contactsStyles, closeChat, currentChat])

  const handleCloseChat = (e) => {
    e.preventDefault()
    setCloseChat(true)
    setCurrentChat(null)
  }

  const debounceSearch = useDebounce(getUserName, 500);

  const searchContacts = (e) => {
    setSearchFriend(e.target.value)
    debounceSearch(e.target.value, setFriends)
  }

  const user = JSON.parse(localStorage.getItem('chat-user'))

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        messageImage: data.file,
        createdAt: Date.now(),
      })
    })
    // socket.current.on('getDeletedMessage', (data) => {
    //   const removeMessage = messages.filter((message) => message._id !== data.messageId )
    //   setMessages(removeMessage)
    // })
  }, [messages])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', (users) => {
      // console.log(users)
      // setUserOnline(users)
      // setOnlineUsers(
      //   user.filter((f) => users.some((u) => u.userId === f))
      // )
    })
  }, [user])


  useEffect(() => {
    conversationFetch(user, setConversation)
  }, [user, user._id])

  useEffect(() => {
    getMessages(currentChat, setMessages)
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  return (
    <div className={st.chat_wrapper}>
      <UserSettings
        conversation={conversation}
        user={user}
        showSettings={showSettings}
        setShowSettings={setShowSettings} />
      <Contacts
        contactsStyles={contactsStyles}
        searchFriend={searchFriend}
        searchContacts={searchContacts}
        friends={friends}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        user={user}
        setCurrentChat={setCurrentChat}
        showContacts={showContacts}
        setShowContacts={setShowContacts}
        conversation={conversation}
        showSettings={showSettings}
        setShowSettings={setShowSettings} />
      <Message
        messageStyles={messageStyles}
        currentChat={currentChat}
        handleCloseChat={handleCloseChat}
        user={user}
        setShowSearch={setShowSearch}
        showSearch={showSearch}
        messages={messages}
        scrollRef={scrollRef}
        socket={socket}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
        setMessages={setMessages}
        imageData={imageData}
        setImageData={setImageData} />
    </div>
  )
}

export default Chat