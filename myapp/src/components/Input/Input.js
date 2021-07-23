import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

// компонент Input - текстовое поле и кнопка отправки сообшения
// значение текстового поля хранится в компоненте
const Input = (props) => {
    const { onSubmit, onChange } = props

    // отслеживание состояния ввода текста сообщения
    const [inputValue, setInputValue] = useState('')

    // функция handleChange - обработка изменения текста в input
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    // функция handleSubmit - обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault() // отключаем действие по умолчанию для эвента, чтобы не перейти на корнев ур страницы

        // если в компонент Input передали фун-ю onSubmit
        if (onSubmit) {
            onSubmit(inputValue) // отправляем сообщение
            setInputValue('') // очищаем input
        }
    }

    return (
        <form
            className="message-form"
            onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                value={inputValue}
                label="Ваше сообщение..."
                required
                fullWidth
                autoFocus
                variant="filled"
                size="small"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
            >Отправить
            </Button>
        </form>
    )
}

export default Input