import { combineReducers, createStore } from 'redux'
import profileReducer from './reducers/profile'

// "массив" наших редюсеров
const rootReducer = combineReducers({
    profile: profileReducer
})

// создаем объект store, передаем ему reducer и подключаем redux dev tools
export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
