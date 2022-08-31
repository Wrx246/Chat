import React from 'react'
import st from '../styles/Chat.module.scss'
import SubmitLogo from '../assets/images/send.svg'
import VoiceLogo from '../assets/images/voice.svg'
import AttachLogo from '../assets/images/attach.svg'
import SettingsLogo from '../assets/images/settings.svg'
import ProfileImage from '../assets/images/profile-image.png'
import ContactImage from '../assets/images/contact.png'

const Chat = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={st.chat_wrapper}>
      <div className={st.chat_contacts}>
        <div className={st.chat_header}>
          <h3>X-chat</h3>
          <input placeholder='Search for anything' />
        </div>
        <div className={st.chat_body}>
          <div className={st.contact_item}>
            <img src={ContactImage} alt='contact image' />
            <span>Wendy Cambell</span>
          </div>
        </div>
        <div className={st.chat_bottom}>
          <div>
            <img src={ProfileImage} alt='profile image' />
            <span>Brit Ferguson</span>
          </div>
          <button type='button'>
            <img src={SettingsLogo} alt='settings image' />
          </button>
        </div>
      </div>
      <div className={st.message_wrapper}>
        <div className={st.message_header}>
          <div className={st.header_decription}>
            <img src={ProfileImage} alt='profile image' />
            <span>Josh California</span>
            <p>josh.cal@gmail.com</p>
          </div>
          <div className={st.header_input}>
            <input placeholder='search' />
          </div>
        </div>
        <div className={st.message_body}>
          <div className={st.message_item}>
            <img src={ProfileImage} alt='profile image' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  )
}

export default Chat