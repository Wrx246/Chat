import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useDebounce } from '../hooks/useDebounce'
import st from '../styles/Chat.module.scss'
import Logo from '../assets/images/logo.svg'
import Search from '../assets/images/Search.svg'
import BackArrow from '../assets/images/back-arrow.svg'
import ContactItem from '../UI/ContactItem'
import ContactSettings from '../UI/ContactSettings'
import ContactSlider from '../UI/ContactSlider'
import ContactsOnline from '../UI/ContactsOnline'
import MessageHeader from '../UI/MessageHeader'
import MessageInput from '../UI/MessageInput'
import MessageItem from '../UI/MessageItem'
import SearchContacts from '../UI/SearchContacts'
import { conversationFetch, getMessages, getUserName } from '../utils/chatFetch'
import UserSettings from '../UI/UserSettings'

const Chat = () => {
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [showContacts, setShowContacts] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
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
      {/* <div className={st.chat_contacts}> */}
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
      {/* <div className={st.message_wrapper}> */}
      <div className={messageStyles.join(' ')}>
        {currentChat ?
          <>
            <div className={st.message_header}>
              <img
                className={st.message_back}
                onClick={handleCloseChat}
                src={BackArrow}
                alt="back arrow" />
              <MessageHeader currentChat={currentChat} user={user} />
              <div className={st.header_input}>
                <button type="button" onClick={() => setShowSearch(!showSearch)}>
                  <img src={Search} alt="search message" />
                </button>
                {showSearch && <input placeholder="search" />}
              </div>
            </div>
            <div className={st.message_body}>
              {
                messages.map((message, index) => {
                  return (
                    <div key={index} ref={scrollRef}>
                      <MessageItem
                        message={message} user={user} />
                    </div>
                  )
                })
              }
            </div>
            <MessageInput
              socket={socket}
              user={user}
              currentChat={currentChat}
              setNewMessage={setNewMessage}
              newMessage={newMessage}
              setMessages={setMessages}
              messages={messages}
              imageData={imageData}
              setImageData={setImageData}
            />
          </>
          : <div className={st.chat_preloader}>
            <h2>
              Welcome, {user.userName}<br />
              Start talking with your friends
            </h2>
          </div>}
      </div>
    </div>
  )
}

export default Chat