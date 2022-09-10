import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactTooltip from "react-tooltip";
import st from '../styles/UserSettings.module.scss'
import PicPhoto from '../assets/images/change-photo.svg'
import ProfileImage from '../assets/images/profile-image.svg'
import DoneIcon from '../assets/images/done-icon.svg'
import { deleteAccount, submitAvatar } from '../utils/userFetch'
import SendImage from './SendImage'
import UpdatePassword from './forms/UpdatePassword'
import UpdateEmail from './forms/UpdateEmail'
import UpdateUserName from './forms/UpdateUserName'

const UserSettings = ({ showSettings, setShowSettings, user, conversation }) => {
    const [showInput, setShowInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showUserInput, setShowUserInput] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hideEmail, setHideEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(null)
    const [completePassword, setCompletePassword] = useState(false)
    const [completeEmail, setCompleteEmail] = useState(false)
    const [completeUserName, setCompleteUserName] = useState(false)

    const navigate = useNavigate();

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

    const handleSettings = (e) => {
        e.preventDefault();
        setShowSettings(false)
        setCompletePassword(false)
        setCompleteEmail(false)
        setCompleteUserName(false)
        setShowEmailInput(false)
        setShowUserInput(false)
        setShowInput(false)
    }

    return (
        <div className={rootStyles.join(' ')} onClick={handleSettings}>
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
                    <span>{user.userName}</span>
                </div>
                <hr />
                <div className={st.settings_main}>
                    <div className={st.main_item}>
                        <div>
                            <div className={st.item_done}>
                                <h3>UserName</h3>
                                {completeUserName && <img src={DoneIcon} alt="done" />}
                            </div>
                            {showUserInput ?
                                <UpdateUserName user={user} setCompleteUserName={setCompleteUserName} />
                                :
                                <h4>{user.userName}</h4>
                            }
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowUserInput(!showUserInput)}>
                            change
                        </button>
                    </div>
                    <div className={st.main_item}>
                        <div>
                            <div className={st.item_done}>
                                <h3>Email</h3>
                                {completeEmail && <img src={DoneIcon} alt="done" />}
                            </div>
                            {showEmailInput ?
                                <UpdateEmail user={user} setCompleteEmail={setCompleteEmail} />
                                :
                                <>
                                    <span>{hideEmail}</span>
                                    <button
                                        onClick={() => setShowEmail(!showEmail)}
                                        className={st.email_button}>
                                        {showEmail ? 'hide' : 'show'}
                                    </button>
                                </>
                            }

                        </div>
                        <button
                            type="button"
                            onClick={() => setShowEmailInput(!showEmailInput)}>
                            change
                        </button>
                    </div>
                    <div className={st.main_item}>
                        <div>
                            <div className={st.item_done}>
                                <h3>Password</h3>
                                {completePassword && <img src={DoneIcon} alt="done" />}
                            </div>
                            {
                                showInput &&
                                <UpdatePassword
                                    user={user}
                                    setCompletePassword={setCompletePassword} />
                            }
                        </div>
                        <button type="button" onClick={() => setShowInput(!showInput)}>
                            change
                        </button>
                    </div>
                    <hr />
                    <div>
                        <h4>Delete Account</h4>
                        <button
                            type="button"
                            // onClick={() => deleteAccount(user._id, navigate, conversation)}>
                            data-tip data-for="registerTip">
                            Delete Account
                        </button>
                        <ReactTooltip id="registerTip" place="top" effect="solid">
                            This button in progress
                        </ReactTooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings