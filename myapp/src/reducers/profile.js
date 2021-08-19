// подключаем наши экшины
import { CHANGE_NAME, CHANGE_SHOW_NAME, CHANGE_IS_AUTHED } from '../actions/profile'

// дефолтные значения для state
const initialState = {
    showName: true,
    name: 'Grag',
    isAuthed: false,
}

// функция reducer - принимает текущее состояние store через state 
// и в зависимости от переданного action 
// выбирает какие изминения требуется произвести с store
// и после изменения store возвращает изминеный state
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_NAME: {
            return {
                ...state,
                name: action.payload.name
            }
        }
        case CHANGE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName
            }
        }
        case CHANGE_IS_AUTHED: {
            return {
                ...state,
                isAuthed: action.payload.isAuthed
            }
        }
        // если изменений state не было возвращаем старое значение state
        default:
            return state
    }
}