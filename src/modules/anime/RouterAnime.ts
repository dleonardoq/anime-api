import { Request, Response, Router } from 'express'
import { ControllerAnime } from './ControllerAnime'
import { querySchemaType, validateSchema } from './Schemas/querySchema'

export const routerAnime = (): Router => {
  const router = Router()

  const controllerAnime = new ControllerAnime()

  router.get('', async (req: Request, res: Response): Promise<void> => {
    const { status, data } = validateSchema({ queryParams: req.query })
    if (!status) {
      res.status(400).json({
        statusCode: 400,
        error: JSON.parse(data as string),
        data: []
      })
    }
    const animeResponse = await controllerAnime.getAll({ input: data as querySchemaType })
    res.status(animeResponse.statusCode).json(animeResponse)
  })

  return router
}
