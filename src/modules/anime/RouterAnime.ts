import { Request, Response, Router } from 'express'
import { ControllerAnime } from './ControllerAnime'

export const routerAnime = (): Router => {
  const router = Router()

  const controllerAnime = new ControllerAnime()

  router.get('/anime', async (_req: Request, res: Response): Promise<void> => {
    const animeResponse = await controllerAnime.getAll()
    res.status(animeResponse.statusCode).json(animeResponse)
  })

  return router
}
