import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileReducer from './reducers/profile'
import chatsReducer from './reducers/chats'
import messagesReducer from './reducers/messages'
import newsReducer from './reducers/news'

// список наших редюсеров - корневой редюсер
const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    news: newsReducer,
})

// конфиг для persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile', 'news'],
    blacklist: ['chats', 'messages']
}

// persist редюсер 
const persistedReducer = persistReducer(persistConfig, rootReducer)

// composeEnhancers - функция в которую с помощью applyMidleware положим middleware thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// создаем объект store, передаем ему reducer и подключаем redux dev tools
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
