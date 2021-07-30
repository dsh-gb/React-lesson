import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './components/Router/Router'
import './index.css'
import { store } from './store'

ReactDOM.render(
  <React.StrictMode>
    {/* оборачиваем все наше прилодение в компонент Provider
    и передаем ему в пропсы наш объект store */}
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
