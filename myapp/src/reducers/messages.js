// подключаем наши экшины для messsages
import { CHANGE_MESSAGES } from '../actions/messages'

// дефолтные значения для state.messages
// сообщения чатов - массив объектов в котором idChat - это id чата и 
// messagesChat - массив объектов-сообщений для чата с этим id
const initialState = {
    messages: []
    // структура объекта messages
    // messages: [
    //  {idChat="1", 
    //  messagesChat=[{author: "Me", text: "ku ku"}, {author: "Bot", text: "Hello"}]
    //  },  
    //  {idChat="3", 
    //  messagesChat=[{author: "Me", text: "Hi"}, {author: "Bot", text: "Hello"}]
    // ], 
}

// функция reducer - принимает текущее состояние store.messages через state 
// и в зависимости от переданного action 
// выбирает какие изминения требуется произвести с store
// и после изменения store возвращает изминеный state
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // наши экшины для messages
        case CHANGE_MESSAGES: {
            return {
                ...state,
                messages: action.payload.newMessages
            }
        }

        // если изменений state не было возвращаем старое значение state
        default:
            return state
    }
}