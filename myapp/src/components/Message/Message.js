import React from "react"
import { AUTHORS } from '../App/constants'

// компонент Message, вывод текста в формате: автор - текст
// добавленны разные стили для бота и пользователя
function Message(props) {
    const { message: { author, text } } = props
    return (
        <>
            {
                author === AUTHORS.ME &&
                < li className="message-me" >
                    <div className="message-author">
                        {author}
                    </div>
                    <div className="message-me-text">
                        {text}
                    </div>
                </li >
            }
            {
                author === AUTHORS.BOT &&
                < li className="message-bot" >
                    <div className="message-author">
                        {author}
                    </div>
                    <div className="message-bot-text">
                        {text}
                    </div>
                </li >
            }
        </>
    )
}

export default Message