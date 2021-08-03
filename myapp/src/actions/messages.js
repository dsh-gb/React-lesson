export const CHANGE_MESSAGES = "MESSSAGES::CHANGE_MESSAGES"

// экшен changeMessages - функция изменения сообщений чата
export const changeMessages = (newMessages) => ({
    type: CHANGE_MESSAGES,
    payload: {
        newMessages
    }
})