import { API } from "./apiConsts"


export const conversationFetch = async (user, setConversation) => {
    try {
        await API.get(`conversations/${user._id}`)
            .then((res) => {
                setConversation(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (friendId, setFriend) => {
    try {
        await API.get(`user?userId=${friendId}`)
            .then((res) => {
                setFriend(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getUserData = async (friendId, setFriend) => {
    try {
        await API.get(`user/userdata?userId=${friendId}`)
            .then((res) => {
                setFriend(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getUserName = async (friendName, setFriend) => {
    if (friendName === '') {
        return;
    }

    try {
        await API.get(`user?userName=${friendName}`)
            .then((res) => {
                setFriend(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async (currentChat, setMessages) => {
    try {
        await API.get(`messages/${currentChat?._id}`)
            .then((res) => {
                setMessages(res.data)
            })
    } catch (error) {
        console.log(error)
    }

}

export const submitMessage = async (
    user, newMessage, currentChat, setMessages, messages, setNewMessage, 
    socket, image, setImage, imageData, setImageData
    ) => {
    const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
        messageImage: imageData
    }

    const receiverId = currentChat.members.find((member) => member !== user._id)

    await socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId,
        text: newMessage,
        file: imageData,
    })

    try {
        await API.post(`messages`, message)
            .then((res) => {
                setMessages([...messages, res.data])
                setNewMessage('')
            })
    } catch (error) {
        console.log(error)
    }
}

export const submitImage = async (user, newMessage, currentChat, setMessages, messages, setNewMessage, 
    socket, image, setImage, imageData, setImageData) => {

    const data = new FormData();
    data.append('image', image)
    try {
        await API.post('messages/image', data, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        .then((res) => {
            const imageData = res.data;
            setImage(null)
            submitMessage(user, newMessage, currentChat, setMessages, messages, setNewMessage, 
                socket, image, setImage, imageData, setImageData)
        })
    } catch (error) {
        console.log(error)
    }
}

