export const CHANGE_NAME = "PROFILE::CHANGE_NAME"
export const CHANGE_SHOW_NAME = "PROFILE::CHANGE_SHOW_NAME"
export const CHANGE_IS_AUTHED = "PROFILE::CHANGE_IS_AUTHED"

// экшен changeName - функция изменения имени name
export const changeName = (name) => ({
    type: CHANGE_NAME,
    payload: {
        name
    }
})

// экшен changeShowName - функция изменения видимости имени name
export const changeShowName = () => ({
    type: CHANGE_SHOW_NAME
})

// экшен changeIsAuthed - функция отслеживания автор пользователя
export const changeIsAuthed = (isAuthed) => ({
    type: CHANGE_IS_AUTHED,
    payload: {
        isAuthed
    }
})