import React from 'react'
import st from '../styles/Chat.module.scss'
import SubmitLogo from '../assets/images/send.svg'
import VoiceLogo from '../assets/images/voice.svg'
import AttachLogo from '../assets/images/attach.svg'

const Chat = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={st.chat_wrapper}>
      <div className={st.chat_contacts}>Contacts</div>
      <div className={st.message_wrapper}>
        <div className={st.message_header}>
          <div className={st.header_decription}>
            <div></div>
            <span>Josh California</span>
            <p>josh.cal@gmail.com</p>
          </div>
          <div className={st.header_input}>
            <input placeholder='search' />
          </div>
        </div>
        <div className={st.message_body}>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text text textaslkdjfn;asjdfn;laskjdnflkasjdnflkjasndflkjnasldkfjnasl;kjdfnaslkjdfnalskjfdnlasdklfjgnlsdkfjgnsdlkjfgnsldfkjgnsdlkjfgnsdflkgjnsdflkgjnsdflgkjnsdfglkjfn
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text text textaslkdjfn;asjdfn;laskjdnflkasjdnflkjasndflkjnasldkfjnasl;kjdfnaslkjdfnalskjfdnlasdklfjgnlsdkfjgnsdlkjfgnsldfkjgnsdlkjfgnsdflkgjnsdflkgjnsdflgkjnsdfglkjfn
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
              text text textaslkdjfn;asjdfn;laskjdnflkasjdnflkjasndflkjnasldkfjnasl;kjdfnaslkjdfnalskjfdnlasdklfjgnlsdkfjgnsdlkjfgnsldfkjgnsdlkjfgnsdflkgjnsdflkgjnsdflgkjnsdfglkjfn
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text textaslkdjfn;asjdfn;laskjdnflkasjdnflkjasndflkjnasldkfjnasl;kjdfnaslkjdfnalskjfdnlasdklfjgnlsdkfjgnsdlkjfgnsldfkjgnsdlkjfgnsdflkgjnsdflkgjnsdflgkjnsdfglkjfn
                text texzadgadgat text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh1451 California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text textqwerqrtq text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text tex23q4523t text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text text text
                text texadsfasdfazt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text teadsfdsfxt text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh California</span>
              <p>
                text teqerqwerxt text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Joshadfsdf California</span>
              <p>
                text text text
                text texzt text text
              </p>
            </div>
          </div>
          <div className={st.message_item}>
            <img src='' />
            <div>
              <span>Josh adafadfCalifornia</span>
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