import { fireEvent, render } from '@testing-library/react'
import Profile from './Profile'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import changeShowName from '../../actions/profile'

// тесты для компонента-контейнера Profile
describe("Component Profile", () => {
    const initialState = {
        profile: {
            showName: true,
            name: 'Grag',
            isAuthed: false,
        }
    }
    const mockStore = configureStore()
    let store, component

    beforeEach(() => {
        store = mockStore(initialState)
        component = render(<Provider store={store}><Profile /></Provider>)
    })

    it('dispatches changeShowName', () => {
        const checkBox = component.getByText('Показать имя')
        const click = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })

        fireEvent(checkBox, click)

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        expect(lastAction).toEqual(changeShowName());
    });
})