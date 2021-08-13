import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React from 'react'

//Диалоговое окно создания нового аккаунта 
function Registration(props) {
    const { handleChangeEmail, handleChangePassword, handleCloseReg, handleRegistration, openReg } = props

    return <>
        < Dialog open={openReg} onClose={handleCloseReg} >
            <DialogTitle>Регистрация</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите корректный Email и придумайте пароль.
                    Для регистрации нажмите на кнопку "Создать",
                    для отмены регистрации - на кнопку "Отмена"
                </DialogContentText>
                <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    id="email-reg"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={handleChangeEmail}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    id="password-reg"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={handleChangePassword}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseReg}
                    variant="contained"
                    color="primary"
                    key='btn-close'
                >
                    Отмена
                </Button>
                <Button
                    onClick={handleRegistration}
                    variant="contained"
                    color="primary"
                    key='btn-reg'
                >
                    Создать
                </Button>
            </DialogActions>
        </Dialog >
    </>
}

export default Registration