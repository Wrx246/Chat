import { API } from "./apiConsts"


export const getNewConversation = async (firstUserId, secondUserId, setCurrentChat) => {
    try {
        await API.post(`conversations/`, {
            senderId: firstUserId,
            receiverId: secondUserId,
        })
            .then((res) => {
                setCurrentChat(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const deleteConversation = async (conversation) => {
    try {
        await API.post('conversations/delete', {
            conversationId: conversation._id
        }).then((res) => console.log(res.data))
    } catch (error) {
        console.log(error)
    }
}