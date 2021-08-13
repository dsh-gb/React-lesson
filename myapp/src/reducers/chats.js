// подключаем наши экшины для chats
import { ADD_CHATS, REMOVE_CHATS } from '../actions/chats'

// дефолтные значения для state.chats
const initialState = {
    chats: [],
    initialCurrentChat: []
}

// функция reducer - принимает текущее состояние state.chats 
// и в зависимости от переданного action 
// выбирает какие изминения требуется произвести с store
// и после изменения store возвращает изминенный state
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // наши экшины для chats
        case (ADD_CHATS): {
            return {
                ...state,
                chats: [...state.chats, { id: `${action.payload.chatId}`, name: `Чат id-${action.payload.chatId}` }]
            }
        }
        case (REMOVE_CHATS): {
            return {
                ...state,
                chats: state.chats.filter(el => el.id !== action.payload.chatId)
            }
        }
        // если изменений state не было возвращаем старое значение state
        default:
            return state
    }
}