import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeShowName, changeName } from '../../actions/profile'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '../Input/Input'
import { profileSelector } from '../../selectors/profile'
import Header from '../Header/Header'

function Profile() {
    // вызываем dispatch используя хук useDispatch
    const dispatch = useDispatch()

    // получаем доступ к данным profile в store с помощью хука useSelector
    // используем для этого profileSelector
    const { showName, name } = useSelector(profileSelector)

    // функция handleShowName - изминение showName в store 
    const handleShowName = () => dispatch(changeShowName())

    // функция handleChangeName - изминение name в store
    const handleChangeName = (newName) => dispatch(changeName(newName))


    return <>
        <Header text="Ваш профиль" key="profile" />
        <div>
            <Input
                onSubmit={handleChangeName}
                label="Ваше имя..."
            />
            <div className="profile-input">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showName}
                            onChange={handleShowName}
                            color="primary"
                        />
                    }
                    label="Показать имя"
                    labelPlacement="start"
                />
                {showName && <div className="profile-text">{name}</div>}

            </div>
        </div>
    </>
}

export default Profile