import { NEWS } from "../components/App/constants"

export const SET_NEWS_LIST = 'NEWS::SET_NEWS_LIST'
export const SET_LOADING_STATUS = 'NEWS::SET_LOADING_STATUS'
export const SET_IDLE_STATUS = 'NEWS::SET_IDLE_STATUS'
export const SET_ERROR_STATUS = 'NEWS::SET_ERROR_STATUS'

export const setLoadingStatus = () => ({ type: SET_LOADING_STATUS })

export const setIdleStatus = () => ({ type: SET_IDLE_STATUS })

export const setErrorStatus = () => ({ type: SET_ERROR_STATUS })

export const setNewsList = (newsList) => ({
    type: SET_NEWS_LIST,
    payload: {
        newsList,
    }
})

export const fetchNews = () => {
    return (dispatch, getState) => {
        dispatch(setLoadingStatus())

        fetch(NEWS.API_URL)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                dispatch(setNewsList(responseJson))
                dispatch(setIdleStatus())
            })
            .catch((err) => {
                dispatch(setErrorStatus())
                console.error(err)
            })
    }
}
