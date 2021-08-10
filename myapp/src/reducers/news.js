import { SET_ERROR_STATUS, SET_IDLE_STATUS, SET_LOADING_STATUS, SET_NEWS_LIST } from "../actions/news"
import { NEWS } from "../components/App/constants"

const initialState = {
    list: [],
    status: NEWS.REQUEST_STATUS.IDLE
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING_STATUS: {
            return {
                ...state,
                status: NEWS.REQUEST_STATUS.LOADING
            }
        }
        case SET_IDLE_STATUS: {
            return {
                ...state,
                status: NEWS.REQUEST_STATUS.IDLE
            }
        }
        case SET_ERROR_STATUS: {
            return {
                ...state,
                status: NEWS.REQUEST_STATUS.ERROR
            }
        }
        case SET_NEWS_LIST: {
            return {
                ...state,
                list: action.payload.newsList
            }
        }
        default:
            return state
    }
}
