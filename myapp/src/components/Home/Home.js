import React from 'react'
import { persistor } from '../../store'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Header from '../Header/Header'

function Home() {
    return <>
        <Header text="Домашняя страница" key="home" />
        {/* добавил кнопку очистки Local Storage */}
        <div className="App-block">
            <Button
                onClick={() => persistor.purge()}
                type="button"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<DeleteIcon />}
            >Очистка Locale Storage</Button>
        </div>
    </>
}

export default Home