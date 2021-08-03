import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messagesSelector } from '../../selectors/messages'
import { changeMessages } from '../../actions/messages'
import usePrevious from '../../hooks/usePrevious'
import Message from '../Message/Message'
import Input from '../Input/Input'
import { AUTHORS } from '../App/constants'

// компонент Chat - отрисовывание и запись сообщений в store.messages
const Chat = (props) => {
    // записываем id выбранного чата в currentChatId
    const { currentChatId } = props

    // вызываем dispatch используя хук useDispatch
    const dispatch = useDispatch()

    // получаем доступ к данным messages в store с помощью хука useSelector и селектора messagesSelector
    const { messages } = useSelector(messagesSelector)

    // функция handleChangeMessages - изминение в state.messages
    const handleChangeMessages = (newMessages) => dispatch(changeMessages(newMessages))

    // отслеживание состояния для списка сообщения
    const [messageList, setMessageList] = useState([])

    // currentChat - массив messagesChat с idChat равным текущему id чату
    const currentChat = messages.find(el => el.idChat === currentChatId)?.messagesChat

    // функция handleMessageSubmit  - обработка отправки формы
    const handleMessageSubmit = (newMessageText) => {
        setMessageList((currentMessageList) => [
            ...currentMessageList,
            { author: AUTHORS.ME, text: newMessageText }, // добавляем новый объект в массив сообщений
        ])
        // записываем в объект массива messages с idChat равным текущему id чата 
        // новое сообщение messagesChat, если нету объекта с таким idChat, то
        // создаем его и записываем сообщение в него
        if (messages.length) {
            if (currentChat !== undefined) {
                currentChat.push({ author: AUTHORS.ME, text: newMessageText })
            } else {
                messages.push({
                    idChat: currentChatId,
                    messagesChat: [{ author: AUTHORS.ME, text: newMessageText }]
                })
            }
        } else {
            // инициализация массива чатов сообщений
            messages[0] = {
                idChat: currentChatId,
                messagesChat: [{ author: AUTHORS.ME, text: newMessageText }]
            }
        }
        handleChangeMessages([...messages])
    }

    // используем хук usePrevious для получения предыдущего значения messageList
    const prevMessageList = usePrevious(messageList)

    // 
    const timer = useRef(null)

    useEffect(() => {
        if (prevMessageList?.length < messageList.length && messageList[messageList.length - 1].author === AUTHORS.ME)
            timer.current = setTimeout(() => {
                currentChat.push({ author: AUTHORS.BOT, text: 'привет' })
                handleChangeMessages([...messages])
            }, 1500)
    }, [messageList, prevMessageList]) // указываем зависимости для UseEffect

    // удаляем таймер после его использования
    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    return (
        // если не выбран чат, то выводим сообщение "Выбирите чат", иначе
        // отрисовка списка сообщений, а так же поля ввода из компонента Input
        <>
            {!currentChatId ? <h2 className="message-window">Выбирите чат</h2> :
                <ul className="message-list">
                    {currentChat?.map((message, index) => <Message key={index} message={message} />)}
                    <Input onSubmit={handleMessageSubmit} label="Ваше сообщение..." />
                </ul>}
        </>
    )
}

export default Chat