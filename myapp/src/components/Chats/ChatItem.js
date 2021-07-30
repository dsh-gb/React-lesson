import React, { useRef, useEffect, useState } from 'react'
import usePrevious from '../../hooks/usePrevious'
import Message from '../Message/Message'
import Input from '../Input/Input'
import { AUTHORS } from '../App/constants'

// компонент Chat - отрисовывание и хранение сообщений
const Chat = (props) => {
    // отслеживание состояния для списка сообщения
    const [messageList, setMessageList] = useState([])

    // функция handleMessageSubmit  - обработка отправки формы
    const handleMessageSubmit = (newMessageText) => {
        setMessageList((currentMessageList) => [
            ...currentMessageList,
            { author: AUTHORS.ME, text: newMessageText }, // добавляем новый объект в массив сообщений
        ])
    }

    // используем хук usePrevious для получения предыдущего значения messageList
    const prevMessageList = usePrevious(messageList)

    // 
    const timer = useRef(null)

    useEffect(() => {
        // если текущий массив сообщений поменялся - стал длиньше 
        // оператор ? проверяет есть ли вообще свойство length у предыдущего значения массива 
        // и если последняя запись в массиве сообщений от автора Me
        // то вызываем ответ бота через 1.5 сек на сообщение автора Me
        if (prevMessageList?.length < messageList.length && messageList[messageList.length - 1].author === AUTHORS.ME)
            timer.current = setTimeout(() => {
                setMessageList((currentMessageList) => [
                    ...currentMessageList,
                    { author: AUTHORS.BOT, text: 'привет' }]) // добавляем новый объект в массив сообщений
            }, 1500)
    }, [messageList, prevMessageList]) // указываем зависимости для UseEffect

    // удаляем таймер после его использования
    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    return (
        // отрисовка списка сообщений, а так же поля ввода из компонента Input
        <>
            <ul className="message-list">
                {messageList.map((message, index) => <Message key={index} message={message} />)}
                <Input onSubmit={handleMessageSubmit} label="Ваше сообщение..." />
            </ul>
        </>
    )
}

export default Chat