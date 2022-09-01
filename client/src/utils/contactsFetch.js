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