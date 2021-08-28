import { render, screen } from '@testing-library/react'
import Message from './Message'

// тесты для презентационого компонента Message
describe("Component Message", () => {

    // создаем snapshot для компонента Message с данными author="Bot", text="text test" 
    it("Message snapshot author=Bot", () => {
        const component = render(<Message author="Bot" text="text test" />)
        expect(component).toMatchSnapshot()
    })

    // проверяем, если author="Bot" то в тэге <li> есть класс "message-bot"
    it("For author=Bot tag <li> include className='message-bot'", () => {
        render(<Message author="Bot" text="text test" />)
        const liTagMessage = screen.getByText(/Bot/i).parentElement
        expect(liTagMessage).toHaveClass('message-bot')
    })

    // проверяем, если author="Bot" то text находится в div с классом "message-bot-text"
    it("For author=Bot tag <div> with {text} include className='message-bot-text'", () => {
        render(<Message author="Bot" text="text test" />)
        const divTagMessage = screen.getByText(/text test/)
        expect(divTagMessage).toHaveClass('message-bot-text')
    })
})