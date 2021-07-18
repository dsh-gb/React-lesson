import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import usePrevious from '../../hooks/usePrevious'
import { AUTHORS } from './constants'
import Message from '../Message/Message'

function App() {
  // отслеживание состояния для списка сообщения
  const [messageList, setMessageList] = useState([])

  // отследивание состояния для ввода текста сообщения
  const [inputValue, setInputValue] = useState('')

  // функция handleMessageChange  - обработки изменения текста
  const handleMessageChange = (e) => {
    setInputValue(e.target.value)
  }

  // функция handleMessageSubmit  - обработка отправки формы
  const handleMessageSubmit = (e) => {
    e.preventDefault() // отключаем действие по умолчанию для события

    setMessageList((currentMessageList) => [
      ...currentMessageList,
      { author: AUTHORS.ME, text: inputValue },
    ])
    setInputValue('')
  }

  // используем хук usePrevious для получения предыдущего значения messageList
  const prevMessageList = usePrevious(messageList)

  // 
  const timer = useRef(null)

  React.useEffect(() => {
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
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Chat:</h1>
        </header>

        <ul className="message-list">
          {messageList.map((message, index) => <Message key={index} message={message} />)}
        </ul>

        <form
          className="message-form"
          onSubmit={handleMessageSubmit}>
          <input
            className="message-form-input"
            onChange={handleMessageChange}
            value={inputValue}
            placeholder="Ваше сообщение..."
            required
            type="text" />
          <button className="message-form-button">Отправить</button>
        </form>
      </div>
    </>
  )
}

export default App
