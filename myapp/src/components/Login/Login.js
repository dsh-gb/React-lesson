import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CreateIcon from '@material-ui/icons/Create'
import React, { useState } from 'react'
import Header from '../Header/Header'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { profileSelector } from '../../selectors/profile'
import Registration from './Registration'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [openReg, setOpenReg] = useState(false)
    const { isAuthed } = useSelector(profileSelector)

    const user = firebase.auth().currentUser

    const handleChangeEmail = event => setEmail(event.target.value)
    const handleChangePassword = event => setPassword(event.target.value)

    // функции открытия и закрытия диалогового окна регистрации
    const handleOpenReg = () => setOpenReg(true)
    const handleCloseReg = () => setOpenReg(false)

    // handleLogin - функция логина по еmail и password
    const handleLogin = async () => {
        // signInWithEmailAndPassword - метод входа по еmail и password
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            setError(error.message)
        }
    }

    // signOut - функция логаута
    const handleLogOut = () => firebase.auth().signOut()

    // handleRegistration - функция создания нового аккаунта
    const handleRegistration = async () => {
        // createUserWithEmailAndPassword - метод создания новой учетной записи по еmail и password
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (error) {
            setError(error.message)
        }
        handleCloseReg()
    }

    return <>
        {/* заголовок страницы */}
        {isAuthed ? <Header text={`Привет ${user.email}`} key="welcome-header" /> :
            <Header text="Авторизация" key="login-header" />}

        {/* 
            если пользователь авторизован, то выводим только кнопку "Выйти из аккаунта"
            иначе  выводим поля авторизации по email и password и кнопки
            "Вход в аккаунт" и "Создать аккаунт"
        */}
        {isAuthed
            ?
            <div className="login">
                <p>{`user_uid: ${user.uid}`}</p>
                <Button
                    id='btn-login'
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<VpnKeyIcon />}
                    onClick={handleLogOut}
                >
                    Выйти из аккаунта
                </Button>
            </div>
            :
            // вывод полей email и password, а так же кнопок "Вход в аккаунт" и "Создать аккаунт"
            <div className="login">
                {/* поле email */}
                <TextField
                    className="login-input"
                    margin='normal'
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={handleChangeEmail}
                />
                {/* поле password */}
                <TextField
                    className="login-input"
                    margin='normal'
                    id="passowrd"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={handleChangePassword}
                />
                {/* Кнопка "Вход в аккаунт" */}
                <Button
                    id='btn-login'
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<VpnKeyIcon />}
                    onClick={handleLogin}
                >
                    Вход в аккаунт
                </Button>
                <p>{error}</p>

                {/* Кнопка "Создать аккаунт" */}
                <Button
                    id='btn-registration'
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<CreateIcon />}
                    onClick={handleOpenReg}
                >
                    Создать аккаунт
                </Button>
                {/* Компонент - окно создания нового аккаунта */}
                <Registration
                    handleChangeEmail={handleChangeEmail}
                    handleChangePassword={handleChangePassword}
                    handleCloseReg={handleCloseReg}
                    handleRegistration={handleRegistration}
                    openReg={openReg}
                />
            </div>
        }
    </>
}

export default Login