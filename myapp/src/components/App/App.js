import './App.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chatsSelector } from '../../selectors/chats'
import { messagesSelector } from '../../selectors/messages'
import { addChats, removeChats } from '../../actions/chats'
import { changeMessages } from '../../actions/messages'
import { List, ListItem, ListSubheader, ListItemText, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Chat from '../Chats/ChatItem'
import Header from '../Header/Header'
import firebase from 'firebase'

function App(props) {

  const db = firebase.database()

  // вызываем dispatch используя хук useDispatch
  const dispatch = useDispatch()

  // получаем доступ к данным chats в store с помощью хука useSelector и селектора chatsSelector
  const { chats, initialCurrentChat } = useSelector(chatsSelector)

  // получаем доступ к данным messages в store с помощью хука useSelector и селектора messagesSelector
  const { messages } = useSelector(messagesSelector)

  // отслеживаем состояние текущего чата, начальное значение пустой массив
  let [currentChat, setCurrentChat] = useState(initialCurrentChat)

  // addChat - функция вызова dispatch добавления нового чата в массиве chats в store
  const addChat = (newIdChat) => dispatch(addChats(newIdChat))

  // removeChat - функция вызова dispatch удаления чата по id в массиве chats в store
  const removeChat = (chatId) => dispatch(removeChats(chatId))

  // предварительно обнулив массив chats считываем из узла chats 
  // базы firebase по найденным key все записи и добавляем
  // с помощью экшена addChats эту запись в store
  useEffect(() => {
    chats.splice(0)
    db.ref('chats').get().then(snapshot => {
      snapshot.forEach(item => {
        db.ref('chats').child(`${item.key}`).get().then(snapshot => snapshot.forEach(el => {
          addChat(el.val().id)
        }))
      })
    })
  }, [])


  // handleChatRemove - удаляет чат с индексом chatId из массива чатов chats
  const handleChatRemove = (chatId) => {
    removeChat(chatId)

    // удаление в firebase записи из узла chats с id = chatId
    db.ref('chats').child(chatId).remove()

    // удаляем запись сообщений чата с chatId из массива messages сообщений чатов
    const deleteChatIndex = messages.findIndex(el => el.idChat === chatId)
    messages.splice(deleteChatIndex, 1)
    dispatch(changeMessages(messages))

    // удаление в firebase записи из узла messages с id = chatId
    db.ref('messages').child(chatId).remove()

    // если удаляем чат с текущим id, то записываем в этот id значение undefined
    if (chatId === currentChat.id) {
      currentChat.id = undefined
    }
  }

  // handleChatAdd - вызывается по клику на кнопку, добавляет новый элемент в массив chats
  // с рандомным индексом 
  const handleChatAdd = () => {
    const newIdChat = ('0000' + Math.random().toString(36).replace('.', '')).substr(-5)
    addChat(newIdChat)

    // добавление в базу firebase записи в узел chats с id = chatId
    db.ref('chats').child(newIdChat).push({
      id: newIdChat,
      name: `Чат id-${newIdChat}`
    })
  }

  // если передали в url значение id чата, то записываем переданный id чата в chatsId
  // и проверяем если есть этот id в списке чатов, то записываем в currentCaht чат с этим id
  if (props.match) {
    let chatsId = props.match?.params.chatsId
    chats.forEach(el => {
      if (el.id === chatsId) {
        currentChat = chats[parseInt(chatsId) - 1]
      }
    })
  }

  // currentMessageChat - массив messagesChat с idChat равным текущему id чату
  const currentMessageChat = messages?.find(el => el.idChat === currentChat.id)?.messagesChat

  let textHeader = "сообщений нету"
  if (currentMessageChat !== undefined) {
    textHeader = `сообщений - ${currentMessageChat.length}`
  }

  return (
    <>
      {/* если не выбран чат, то выводим заголовок "Список чатов"
          иначе выводим название выбранного чата  и число сообщений в этом чате*/}
      {!currentChat.id ? <Header text="Список чатов" key="list chats" /> :
        <Header text={textHeader} key="chat" />}

      < div className="chat">
        <List
          className="chat-list"
          component="nav"
          subheader={
            <ListSubheader component="div">
              Список чатов
            </ListSubheader>
          }
        >
          {chats.map((chat) =>
            <div className="chat-list-wrapper" key={`div-${chat.id}`}>
              <ListItem
                button
                onClick={() => setCurrentChat(chat)}
                key={chat.id}
                selected={chat.id === currentChat.id}>
                <ListItemText primary={chat.name} />
              </ListItem>
              <IconButton
                className="chat-list-delete"
                key={`button-${chat.id}`}
                onClick={() => handleChatRemove(chat.id)}
                variant="contained"
                color="primary"
                type="button"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          <IconButton
            className="chat-list-add"
            onClick={handleChatAdd}
            variant="contained"
            color="primary"
            type="button"
            size="small"
          > Создать чат...
            <AddCircleIcon />
          </IconButton>
        </List>
        <Chat currentChatId={currentChat.id} />
      </div>
    </>
  )
}

export default App
