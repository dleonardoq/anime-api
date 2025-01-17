import express, { json } from 'express'
import router from './modules/anime/index'

export const app = express()
const { routerAnime } = router
app.use(json())
app.use('/api/anime', routerAnime())
