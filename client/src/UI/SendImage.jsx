import React, { useRef } from 'react'
import { useState } from 'react';
import st from '../styles/SendImage.module.scss'

const SendImage = ({children, setImage}) => {
    const ref = useRef();
    

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={st.input_settings} onClick={() => ref.current.click()}>
            <input onChange={onChangeImage} ref={ref} type="file" accept="image/*" />
            {children}
        </div>
    )
}

export default SendImage