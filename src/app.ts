import express, { json } from 'express'
import routerAnime from './modules/anime/index'

export const app = express()
app.use(json())
app.use('/api', routerAnime)
