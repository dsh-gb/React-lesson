import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../actions/news'
import { newsSelector } from '../../selectors/news'
import { NEWS } from '../App/constants'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import NewsRender from './NewsRender'
import Header from '../Header/Header'

export default function News(props) {
    // state компонента News
    // const [news, setNews] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)

    // вариант fetch с использованием then с двумя аргументами
    // const loadData = () => {
    //     fetch(API_URL).then(
    //         (response) => {
    //              console.log('Успешно')
    //              setNews(response.json())
    //          },
    //         (err) => console.log('Запрос URL завершился ошибкой', err)
    //     )
    // }

    // вариант fetch с использованием then и catch
    // const loadData = () => {
    //     setIsError(false)
    //     setIsLoading(true)

    //     fetch(NEWS.API_URL)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`Запрос URL завершился ошибкой - ${response.status}`)
    //             }
    //             return response.json()
    //         })
    //         .then((responseJson) => {
    //             setNews(responseJson)
    //             setIsLoading(false)
    //         })
    //         .catch((err) => {
    //             setIsError(true)
    //             setIsLoading(false)
    //             setError('errore response')
    //             console.error(err)
    //         })
    // }

    // вариант с использованием async/await
    // const loadData = async () => {
    //     try {
    //         const response = await fetch(API_URL)

    //         if (!response.ok) {
    //             throw new Error(`Запрос URL завершился ошибкой - ${response.status}`)
    //         }

    //         const responseJson = await response.json()
    //         console.log({ response, responseJson })
    //         setNews(responseJson)
    //     } catch (err) {
    //         console.error('Ошибка запроса URL:', err)
    //     }
    // }

    // useEffect(() => {
    //     loadData()
    // }, [])

    // if (isLoading) {
    //     return <h1>LOADING</h1>
    // }

    const dispatch = useDispatch()
    const { list, status } = useSelector(newsSelector)

    const [open, setOpen] = useState(true)
    const loadNewsList = () => dispatch(fetchNews())
    const handleClose = () => {
        setOpen(false)
        // return list.map((data) => <NewsRender data={data} key={data.id} />)
    }

    useEffect(() => {
        loadNewsList()
    }, [])

    if (status === NEWS.REQUEST_STATUS.LOADING) {
        return <Header text="Загрузка данных с сервера..." key="loading-data" />
    }

    return <>
        {open ?
            <Header text="Новости" key="news-heading" /> :
            <Header text="Новости оффлайн" key="news-heading" />
        }
        {status !== NEWS.REQUEST_STATUS.ERROR
            ?
            list.map((data) => <NewsRender data={data} key={data.id} />)
            : open ?
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{"Ошибка получения данных с сервера!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Для отправки запроса на сервер нажмите на кнопку
                            "Отправить запрос" или на кнопку "Загрузить новости из кэша"
                            для закрытия этого окна и загрузки новостей из кэша
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Загрузить новости из кэша
                        </Button>
                        <Button onClick={loadNewsList} color="primary" autoFocus>
                            Отправить запрос
                        </Button>
                    </DialogActions>
                </Dialog>
                :
                list.map((data) => <NewsRender data={data} key={data.id} />)
        }
    </>
}