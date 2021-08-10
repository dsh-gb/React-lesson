import { combineReducers, createStore } from 'redux'
import profileReducer from './reducers/profile'
import chatsReducer from './reducers/chats'
import messagesReducer from './reducers/messages'

// список наших редюсеров
const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer
})

// создаем объект store, передаем ему reducer и подключаем redux dev tools
export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
