import './App.css'
import React, { useState } from 'react'
import { List, ListItem, ListSubheader, ListItemText } from '@material-ui/core'
import Chat from '../Chats/ChatItem'

function App() {
  // начальный список чатов
  const initialChats = [
    { id: "ch1", name: "Чат 1" },
    { id: "ch2", name: "Чат 2" },
    { id: "ch3", name: "Чат 3" }
  ]

  // отслеживание состояния списка чатов, начальное значение пустой массив
  const [chats, setChats] = useState(initialChats)

  // отслеживаем состояние текущего чата, начальное значение первый элемент массива чата если он есть
  const [currentChat, setCurrentChat] = useState(chats[0])

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Chat:</h1>
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
