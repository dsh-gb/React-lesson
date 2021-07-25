import './App.css'
import React, { useState } from 'react'
import { List, ListItem, ListSubheader, ListItemText } from '@material-ui/core'
import Chat from '../Chats/ChatItem'

function App({ match }) {
  // начальный список чатов
  const initialChats = [
    { id: "1", name: "Чат 1" },
    { id: "2", name: "Чат 2" },
    { id: "3", name: "Чат 3" }
  ]

  // записываем переданный id чата в chatsId
  const chatsId = match?.params.chatsId

  // отслеживание состояния списка чатов, начальное значение пустой массив
  const [chats, setChats] = useState(initialChats)

  // отслеживаем состояние текущего чата, начальное значение первый элемент массива чата
  let [currentChat, setCurrentChat] = useState([])

  // проверяем есть ли такой id чата в нашем списке чатов
  // если есть то в currentChat присваиваем чат с этим id
  initialChats.forEach(el => {
    if (el.id === chatsId) {
      currentChat = initialChats[parseInt(chatsId) - 1]
    }
  })

  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* если не выбран чат, то выводим заголовок "Список чатов"
          иначе выводим название выбранного чата */}
          {currentChat.length === 0 && <h1>Список чатов</h1>}
          {currentChat.length !== 0 && <h1>Ваш чат: {currentChat.name}</h1>}
        </header>
        <div className="chat">
          <List
            className="chat-list"
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Список чатов
              </ListSubheader>
            }
          >
            {chats.map((chat) =>
              <ListItem
                button
                onClick={() => setCurrentChat(chat)}
                key={chat.id}
                selected={chat.id === currentChat.id}>
                <ListItemText primary={chat.name} />
              </ListItem>
            )}
          </List>
          <Chat id={currentChat.id} />
        </div>
      </div>
    </>
  )
}

export default App
