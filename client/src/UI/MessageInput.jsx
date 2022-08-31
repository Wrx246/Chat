import React from 'react'
import SubmitLogo from '../assets/images/send.svg'
import VoiceLogo from '../assets/images/voice.svg'
import AttachLogo from '../assets/images/attach.svg'
import st from '../styles/MessageInput.module.scss'

const MessageInput = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
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
            <form onSubmit={e => handleSubmit(e)}>
                <input placeholder='search' />
                <button type='submit'><img src={SubmitLogo} alt='submit image' /></button>
            </form>
        </div>
    )
}

export default MessageInput