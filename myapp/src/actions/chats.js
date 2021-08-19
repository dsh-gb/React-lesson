export const ADD_CHATS = "CHATS::ADD_CHATS"
export const REMOVE_CHATS = "CHATS::REMOVE_CHATS"

// экшен addChats - функция добавления чата
export const addChats = (chatId) => ({
    type: ADD_CHATS,
    payload: {
        chatId
    }
})

// экшен removeChats - функция удаления чата
export const removeChats = (chatId) => ({
    type: REMOVE_CHATS,
    payload: {
        chatId
    }
})