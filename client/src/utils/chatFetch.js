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