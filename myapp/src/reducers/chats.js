// подключаем наши экшины для chats
import { CHANGE_CHATS } from '../actions/chats'

// дефолтные значения для state.chats
const initialState = {
    chats: [
        { id: "1", name: "Чат 1" },
        { id: "2", name: "Чат 2" },
        { id: "3", name: "Чат 3" }
    ],
    initialCurrentChat: []
}

// функция reducer - принимает текущее состояние state.chats 
// и в зависимости от переданного action 
// выбирает какие изминения требуется произвести с store
// и после изменения store возвращает изминенный state
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // наши экшины для chats
        case (CHANGE_CHATS): {
            return {
                ...state,
                chats: action.payload.chats
            }
        }

        // если изменений state не было возвращаем старое значение state
        default:
            return state
    }
}