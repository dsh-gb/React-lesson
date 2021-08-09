import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import App from '../App/App'
import Profile from '../Profile/Profile'
import Home from '../Home/Home'
import News from '../News/News'
import { LINK } from '../App/constants'

function Router() {
    return <>
        {/* навигационное меню */}
        <nav className="menu">
            <Link to={LINK.HOME} className="menu-link">Домой</Link>
            <Link to={LINK.CHATS} className="menu-link">Чаты</Link>
            <Link to={LINK.PROFILE} className="menu-link">Профиль</Link>
            <Link to={LINK.NEWS} className="menu-link">Новости</Link>
        </nav>

        {/* переходы по нашему приложению */}
        <Switch>
            <Route path={LINK.DEFAULT} exact>
                <Home />
            </Route>
            <Route path={LINK.HOME} exact>
                <Home />
            </Route>
            <Route path={LINK.PROFILE} exact>
                <Profile />
            </Route>
            <Route path={LINK.CHATS} exact>
                <App />
            </Route>
            {/* передаем в App через match.params наш CHATSID */}
            <Route path={LINK.CHATSID} component={App} />
            <Route path={LINK.NEWS} component={News} />

            <Redirect to={LINK.DEFAULT}></Redirect>
        </Switch>
    </>
}

export default Router