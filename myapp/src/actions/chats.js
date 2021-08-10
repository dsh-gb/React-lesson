export const CHANGE_CHATS = "CHATS::CHANGE_CHATS"

// экшен changeChats - функция изменения сообщений чата
export const changeChats = (chats) => ({
    type: CHANGE_CHATS,
    payload: {
        chats
    }
})