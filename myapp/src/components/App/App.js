import './App.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chatsSelector } from '../../selectors/chats'
import { messagesSelector } from '../../selectors/messages'
import { changeChats } from '../../actions/chats'
import { changeMessages } from '../../actions/messages'
import { List, ListItem, ListSubheader, ListItemText, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Chat from '../Chats/ChatItem'

function App(props) {
  // вызываем dispatch используя хук useDispatch
  const dispatch = useDispatch()

  // получаем доступ к данным chats в store с помощью хука useSelector и селектора chatsSelector
  const { chats, initialCurrentChat } = useSelector(chatsSelector)

  // получаем доступ к данным messages в store с помощью хука useSelector и селектора messagesSelector
  const { messages } = useSelector(messagesSelector)

  // отслеживаем состояние текущего чата, начальное значение пустой массив
  let [currentChat, setCurrentChat] = useState(initialCurrentChat)

  // currentMessageChat - массив messagesChat с idChat равным текущему id чату
  const currentMessageChat = messages.find(el => el.idChat === currentChat.id)?.messagesChat

  // removeChat - функция вызова dispatch изминения значения chats в  store
  const changeChat = (newChats) => dispatch(changeChats(newChats))

  // handleChatRemove - вызывается по клику на кнопку, создает новый массив chats
  // без элемента с индексом chatId
  const handleChatRemove = (chatId) => {
    const newChats = chats.filter(el => el.id !== chatId)
    changeChat(newChats)
    // удаляем запись сообщений чата с chatId из массива messages сообщений чатов
    const deleteChatIndex = messages.findIndex(el => el.idChat === chatId)
    messages.splice(deleteChatIndex, 1)
    dispatch(changeMessages(messages))
    // если удаляем чат с текущим id, то записываем в этот id значение undefined
    if (chatId === currentChat.id) {
      currentChat.id = undefined
    }
  }

  // handleChatAdd - вызывается по клику на кнопку, добавляет новый элемент в массив chats
  // с рандомным индексом 
  const handleChatAdd = () => {
    const newIdChats = ('0000' + Math.random().toString(36).replace('.', '')).substr(-5)
    const newChat = { id: `${newIdChats}`, name: `Чат ${newIdChats}` }
    changeChat([...chats, newChat])
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
  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* если не выбран чат, то выводим заголовок "Список чатов"
          иначе выводим название выбранного чата  и число сообщений в этом чате*/}
          {!currentChat.id ? <h1>Список чатов</h1> :
            <h1>{currentChat.name}
              {currentMessageChat !== undefined ?
                <span> / сообщений - {currentMessageChat.length}
                </span> :
                <span> / сообщений нету</span>
              }
            </h1>}
        </header>
        <div className="chat">
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
      </div>
    </>
  )
}

export default App
