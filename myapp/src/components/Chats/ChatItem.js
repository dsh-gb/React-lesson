import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messagesSelector } from '../../selectors/messages'
import { chatsSelector } from '../../selectors/chats'
import { changeMessageWithThunk } from '../../actions/messages'
import Message from '../Message/Message'
import Input from '../Input/Input'
import { AUTHORS } from '../App/constants'
import firebase from 'firebase'

// компонент Chat - отрисовывание и запись сообщений в store.messages
const Chat = (props) => {

    const db = firebase.database()

    // записываем id выбранного чата в currentChatId
    let { currentChatId } = props

    // вызываем dispatch используя хук useDispatch
    const dispatch = useDispatch()

    // получаем доступ к данным messages в store с помощью хука useSelector и селектора messagesSelector
    const { messages } = useSelector(messagesSelector)

    // получаем доступ к данным chats в store с помощью хука useSelector и селектора chatsSelector
    const { chats } = useSelector(chatsSelector)

    const findChatId = chats.find(el => el.id === currentChatId)

    // елси нету в списке чатов chats чата с id = currentChatId,
    // то присваиваем в currentChatId значение undefined
    if (findChatId === undefined) {
        currentChatId = undefined
    }

    // currentChat - массив сообщений объекта с idChat равным текущему id чату, если не найден объект
    // с таким id и он существует в списке чатов chats, то создаем его с idChat=currentChatId 
    // и  с пустым массивом сообщений messagesChat
    let currentChat = messages.find(el => el.idChat === currentChatId)?.messagesChat
    if ((currentChat === undefined) && currentChatId !== undefined) {
        messages.push({
            idChat: currentChatId,
            messagesChat: []
        })
        currentChat = messages[messages.length - 1].messagesChat
    }

    // indexCurrentChat - индекс объекта чата с idChat=currentChatId в массиве чатов messages
    const indexCurrentChat = messages.findIndex(el => el.idChat === currentChatId)

    // функция handleChangeMessages - изминение в state.messages
    const handleChangeMessages = (newMessages, chatId, index) => dispatch(changeMessageWithThunk(newMessages, chatId, index))

    // предварительно обнулив массив messages считываем из узла messages
    // базы firebase по найденным key все записи и добавляем
    // эту запись в store
    useEffect(() => {
        messages.splice(0)
        db.ref('messages').get().then(snapshot => {
            snapshot.forEach(item => {
                messages.push({
                    idChat: item.key,
                    messagesChat: []
                })
                const index = messages.findIndex(el => el.idChat === item.key)
                db.ref('messages').child(`${item.key}`).get().then(snapshot => snapshot.forEach(el => {
                    messages[index].messagesChat.push(el.val())
                }))
            })
        })
    }, [])

    // функция handleMessageSubmit  - обработка отправки формы
    const handleMessageSubmit = (newMessageText) => {
        const message = { author: AUTHORS.ME, text: newMessageText }

        // добавление в базу firebase записи в узел messages с id = chatId 
        db.ref('messages').child(currentChatId).push(message)

        // записываем в массив currentChat новое сообщение message
        currentChat.push(message)
        // диспатчем в сторе измененый объект messages
        handleChangeMessages([...messages], currentChatId, indexCurrentChat)
    }

    return (
        // если не выбран чат, то выводим сообщение "Выбирите чат", иначе
        // отрисовка списка сообщений, а так же поля ввода из компонента Input
        <>
            {!currentChatId ? <h2 className="message-window">Выбирите чат</h2> :
                <ul className="message-list">
                    {currentChat?.map((message, index) => <Message key={index} author={message.author} text={message.text} />)}
                    <Input onSubmit={handleMessageSubmit} label="Ваше сообщение..." />
                </ul>}
        </>
    )
}

export default Chat