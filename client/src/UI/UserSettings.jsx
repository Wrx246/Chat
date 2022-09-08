import { React, useState, useEffect } from 'react'
import st from '../styles/UserSettings.module.scss'
import PicPhoto from '../assets/images/change-photo.svg'
import ProfileImage from '../assets/images/profile-image.svg'
import { submitAvatar } from '../utils/userFetch'
import SendImage from './SendImage'

const UserSettings = ({ showSettings, setShowSettings, user }) => {
    const [showInput, setShowInput] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hideEmail, setHideEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(null)

    const rootStyles = [st.settings_wrapper]
    if (showSettings) {
        rootStyles.push(st.active)
    }

    useEffect(() => {
        if (avatar !== null) {
            submitAvatar(avatar, setAvatar, user._id)
        }
    }, [avatar, user._id])

    useEffect(() => {
        if (!showEmail) {
            const email = user.email;
            const split = email.split('');
            const position = split.indexOf('@');
            if (position === -1) {
                return split
            }
            split.splice(0, position)
            for (let i = 0; i < position; i++) {
                split.unshift('*')
            }
            return setHideEmail(split)
        } else {
            return setHideEmail(user.email)
        }
    }, [showEmail, user.email])

    return (
        <div className={rootStyles.join(' ')} onClick={() => setShowSettings(false)}>
            <div className={st.settings_body} onClick={(e) => e.stopPropagation()}>
                <div className={st.settings_header}>
                    <div className={st.header_avatar}>
                        <SendImage setImage={setAvatar}>
                            {editAvatar &&
                                <div className={st.camera}
                                    onMouseLeave={() => setEditAvatar(false)}
                                    onMouseOver={() => setEditAvatar(true)}>
                                    <img src={PicPhoto} alt="camera" />
                                </div>
                            }
                            <img
                                src={user.avatar ? user.avatar.filePath : ProfileImage}
                                alt="profile img"
                                onMouseLeave={() => setEditAvatar(false)}
                                onMouseOver={() => setEditAvatar(true)} />
                        </SendImage>
                    </div>
                    <span>Jst.wrx</span>
                </div>
                <hr />
                <div className={st.settings_main}>
                    <div className={st.main_item}>
                        <div>
                            <h3>Username</h3>
                            <h4>{user.userName}</h4>
                        </div>
                        <button>change</button>
                    </div>
                    <div className={st.main_item}>
                        <div>
                            <h3>Email</h3>
                            <span>{hideEmail}</span>
                            <button
                                onClick={() => setShowEmail(!showEmail)}
                                className={st.email_button}>
                                {showEmail ? 'hide' : 'show'}
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