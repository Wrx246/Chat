import React, { useEffect, useRef } from 'react'
import st from '../styles/Chat.module.scss'
import Search from '../assets/images/Search.svg'
import BackArrow from '../assets/images/back-arrow.svg'
import MessageHeader from '../UI/message/MessageHeader'
import MessageInput from '../UI/message/MessageInput'
import MessageItem from '../UI/message/MessageItem'

const Message = ({
    messageStyles, currentChat, handleCloseChat, user, setShowSearch, showSearch,
    messages, scrollRef, socket, setNewMessage, newMessage, setMessages, imageData,
    setImageData}) => {
    return (
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
    )
}

export default Message