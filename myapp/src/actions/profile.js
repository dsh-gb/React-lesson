export const CHANGE_NAME = "PROFILE::CHANGE_NAME"
export const CHANGE_SHOW_NAME = "PROFILE::CHANGE_SHOW_NAME"

// экшен changeName - функция изменения имени name
export const changeName = (name) => ({
    type: CHANGE_NAME,
    payload: {
        name: name
    }
})

// экшен changeShowName - функция изменения видимости имени name
export const changeShowName = (showName) => ({
    type: CHANGE_SHOW_NAME,
    payload: {
        showName: showName
    }
})