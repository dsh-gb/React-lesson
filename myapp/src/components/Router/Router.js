import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import App from '../App/App'
import Profile from '../Profile/Profile'
import Home from '../Home/Home'
import News from '../News/News'
import { LINK } from '../App/constants'
import Login from '../Login/Login'
import { useSelector } from 'react-redux'
import { profileSelector } from '../../selectors/profile'
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import { changeIsAuthed } from '../../actions/profile'

// приватный роутер 
const PrivateRoute = (props) => {
    const { isAuthed } = useSelector(profileSelector)
    return isAuthed ? <Route {...props} /> : <Redirect to={LINK.LOGIN} />
}

function Router() {
    // проверка на авторизацию пользователя
    const dispatch = useDispatch()
    useEffect(() => {
        //onAuthStateChanged - метод наблюдатель над объектом Auth, получаем текущего автор пользователя
        firebase.auth().onAuthStateChanged((user) => dispatch(changeIsAuthed(!!user)))
    }, [])

    return <>
        {/* навигационное меню */}
        <nav className="menu">
            <Link to={LINK.HOME} className="menu-link">Домой</Link>
            <Link to={LINK.CHATS} className="menu-link">Чаты</Link>
            <Link to={LINK.PROFILE} className="menu-link">Профиль</Link>
            <Link to={LINK.NEWS} className="menu-link">Новости</Link>
            <Link to={LINK.LOGIN} className="menu-link">Авторизация</Link>
        </nav>

        {/* переходы по нашему приложению */}
        <Switch>
            <Route path={LINK.DEFAULT} exact>
                <Home />
            </Route>
            <Route path={LINK.HOME} exact>
                <Home />
            </Route>
            <PrivateRoute path={LINK.PROFILE} exact>
                <Profile />
            </PrivateRoute>
            <PrivateRoute path={LINK.CHATS} exact>
                <App />
            </PrivateRoute>
            {/* передаем в App через match.params наш CHATSID */}
            <PrivateRoute path={LINK.CHATSID} component={App} />
            <Route path={LINK.NEWS} component={News} />
            <Route path={LINK.LOGIN} component={Login} />

            <Redirect to={LINK.DEFAULT}></Redirect>
        </Switch>
    </>
}

export default Router