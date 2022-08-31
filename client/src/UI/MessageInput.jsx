import React from 'react'
import SubmitLogo from '../assets/images/send.svg'
import VoiceLogo from '../assets/images/voice.svg'
import AttachLogo from '../assets/images/attach.svg'
import st from '../styles/MessageInput.module.scss'
import { submitMessage } from '../utils/chatFetch'

const MessageInput = (
    { newMessage,
        setNewMessage,
        user,
        currentChat,
        setMessages,
        messages }
) => {


    return (
        <div className={st.message_input}>
            <div className={st.input_voice}>
                <button type='button'>
                    <img src={AttachLogo} alt='attach image' />
                </button>
                <button type='button'>
                    <img src={VoiceLogo} alt='voice image' />
                </button>
            </div>
            <div className={st.input_body}>
                <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='search' />
                <button
                    type='submit'
                    onClick={e => submitMessage(
                        e, user, newMessage, currentChat, setMessages, messages, setNewMessage)}>
                    <img src={SubmitLogo} alt='submit image' />
                </button>
            </div>
        </div>
    )
}

export default MessageInput