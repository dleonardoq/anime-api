import express, { json } from 'express'
import router from '@anime/index'
import { errorHandler } from '@middleware/errorHandler'
import { notFound } from '@middleware/notFound'
import { dbConectionMiddleware } from '@middleware/dbConnection'
import { limiter } from '@middleware/requestLimiter'
import { corsMiddleware } from '@middleware/cors'

export const app = express()
const { routerAnime } = router

app.use(json())
app.use(corsMiddleware())
app.use(dbConectionMiddleware)
app.use(limiter)
app.use('/api/anime', routerAnime())

app.use(notFound)
app.use(errorHandler)
