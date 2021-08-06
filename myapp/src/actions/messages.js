import { AUTHORS } from "../components/App/constants"

export const CHANGE_MESSAGES = "MESSSAGES::CHANGE_MESSAGES"

// экшен changeMessages - функция изменения сообщений чата
export const changeMessages = (newMessages) => ({
    type: CHANGE_MESSAGES,
    payload: {
        newMessages
    }
})

// changeMessageWithThunk - экшен midleware
export const changeMessageWithThunk = (newMessages, index) => {
    return (dispatch, getState) => {
        dispatch(changeMessages(newMessages))

        // если последнее сообщение в чате не от автора Bot
        // то вызываем ответ от Bot через 1.5 сек
        const messageChat = newMessages[index].messagesChat
        if (messageChat[messageChat.length - 1].AUTHOR !== AUTHORS.BOT) {
            const botMessage = { author: AUTHORS.BOT, text: "hi, i am bot" }
            setTimeout(() => {
                messageChat.push(botMessage)
                dispatch(changeMessages(newMessages))
            }, 1500)
        }
    }
}
