import express, { json } from 'express'
import router from './modules/anime/index'
import { errorHandler } from './modules/Middlewares/errorHandler'
import { notFound } from './modules/Middlewares/notFound'
import { dbConectionMiddleware } from './modules/Middlewares/dbConnection'

export const app = express()
const { routerAnime } = router

app.use(json())
app.use(dbConectionMiddleware)
app.use('/api/anime', routerAnime())

app.use(notFound)
app.use(errorHandler)
