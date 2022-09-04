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
        messages,
        socket }
) => {


    return (
        <div className={st.message_input}>
            <div className={st.input_voice}>
                <button type="button">
                    <img src={AttachLogo} alt="attach img" />
                </button>
                <button type="button">
                    <img src={VoiceLogo} alt="voice img" />
                </button>
            </div>
            <div className={st.input_body}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            submitMessage(
                                e, user, newMessage, currentChat,
                                setMessages, messages, setNewMessage, socket
                            )
                        }
                    }}
                    placeholder="search" />
                <button
                    type="submit"
                    onClick={e => submitMessage(
                        e, user, newMessage, currentChat, setMessages, messages, setNewMessage, socket
                    )}>
                    <img src={SubmitLogo} alt="submit img" />
                </button>
            </div>
        </div>
    )
}

export default MessageInput