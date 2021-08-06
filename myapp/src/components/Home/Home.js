import React from 'react'
import { persistor } from '../../store'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

function Home() {
    return <>
        <div className="App">
            <header className="App-header">
                <h1>Домашняя страница</h1>
                {/* добавил кнопку очистки Local Storage */}
                <div className="App-block">
                    <p>Очистка Locale Storage</p>
                    <Button
                        onClick={() => persistor.purge()}
                        type="button"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<DeleteIcon />}
                    >Очистить</Button>
                </div>
            </header>
        </div>
    </>
}

export default Home