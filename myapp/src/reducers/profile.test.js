import reducer from "./profile"
import *as actions from "../actions/profile"

describe("test profile reducer", () => {
    // проверка редюсера на вызов с пустым action
    it("return initialState after action={}", () => {
        const initialState = {
            showName: true,
            name: 'Grag',
            isAuthed: false,
        }
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    // проверка редюсера на action=CHANGE_SHOW_NAME
    it("return !showName after action=CHANGE_SHOW_NAME", () => {
        const action = {
            type: actions.CHANGE_SHOW_NAME
        }
        const prevState = {
            showName: true,
            name: 'Grag',
            isAuthed: false,
        }
        const nextState = {
            showName: false,
            name: 'Grag',
            isAuthed: false,
        }
        const received = reducer(prevState, action)
        expect(received).toEqual(nextState)
    })

    // проверка редюсера на action=CHANGE_NAME
    it("return new Name after action=CHANGE_NAME", () => {
        const newName = 'Tom'
        const action = {
            type: actions.CHANGE_NAME,
            payload: { name: newName }
        }
        const prevState = {
            showName: true,
            name: 'Grag',
            isAuthed: false,
        }
        const nextState = {
            showName: true,
            name: newName,
            isAuthed: false,
        }

        const received = reducer(prevState, action)
        expect(received).toEqual(nextState)
    })

    // проверка редюсера на action=CHANGE_IS_AUTHED
    it("return new Name after action=CHANGE_IS_AUTHED", () => {
        const action = {
            type: actions.CHANGE_IS_AUTHED,
            payload: {
                isAuthed: true
            }
        }
        const prevState = {
            showName: true,
            name: 'Grag',
            isAuthed: false,
        }
        const nextState = {
            showName: true,
            name: 'Grag',
            isAuthed: true,
        }

        const received = reducer(prevState, action)
        expect(received).toEqual(nextState)
    })
})