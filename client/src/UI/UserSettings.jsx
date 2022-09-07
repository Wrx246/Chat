import React from 'react'
import st from '../styles/UserSettings.module.scss'
import ProfileImage from '../assets/images/profile-image.png'
import { useState } from 'react'

const UserSettings = ({ showSettings, setShowSettings }) => {
    const [showInput, setShowInput] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const rootStyles = [st.settings_wrapper]
    if (showSettings) {
        rootStyles.push(st.active)
    }

    return (
        <div className={rootStyles.join(' ')} onClick={() => setShowSettings(false)}>
            <div className={st.settings_body} onClick={(e) => e.stopPropagation()}>
                <div className={st.settings_header}>
                    <img src={ProfileImage} alt="profile img" />
                    <span>Jst.wrx</span>
                </div>
                <div className={st.settings_main}>
                    <div className={st.main_item}>
                        <div>
                            <h3>Username</h3>
                            <h4>Jst.wrx</h4>
                        </div>
                        <button>change</button>
                    </div>
                    <div className={st.main_item}>
                        <div>
                            <h3>Email</h3>
                            <span>Jst.wrx@gmail.com</span>
                            <button
                                onClick={() => setShowEmail(!showEmail)}
                                className={st.email_button}>
                                {showEmail ? "hide" : "show"}
                            </button>
                        </div>
                        <button>change</button>
                    </div>
                    <div className={st.main_item}>
                        <h3>Password</h3>
                        {
                            showInput &&
                            <input
                                value={inputValue}
                                type="password"
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter new password" />
                        }
                        <button type="button" onClick={() => setShowInput(!showInput)}>
                            change
                        </button>
                    </div>
                    <hr />
                    <div>
                        <h4>Delete Account</h4>
                        <button type="button">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings