import React from "react"

// компонент Message, вывод текста в формате: автор - текст
function Message(props) {
    const author = props.message.author
    const text = props.message.text
    return (
        <>
            {
                author === 'Me' &&
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
                author === 'Bot' &&
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