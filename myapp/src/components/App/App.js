import './App.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chatsSelector } from '../../selectors/chats'
import { messagesSelector } from '../../selectors/messages'
import { changeChats } from '../../actions/chats'
import { List, ListItem, ListSubheader, ListItemText, Button } from '@material-ui/core'
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
  const removeChat = (newChats) => dispatch(changeChats(newChats))

  // handleChatRemove - вызывается по клику на кнопку, создает новый массив chats
  // без элемента с индексом chatId
  const handleChatRemove = (chatId) => {
    const newChats = chats.filter(el => el.id !== chatId)
    removeChat(newChats)
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
                <Button
                  key={`button-${chat.id}`}
                  onClick={() => handleChatRemove(chat.id)}
                  variant="contained"
                  color="primary"
                  type="button"
                  size="small"
                >Удалить
                </Button>
              </div>
            )}
          </List>
          <Chat currentChatId={currentChat.id} />
        </div>
      </div>
    </>
  )
}

export default App
