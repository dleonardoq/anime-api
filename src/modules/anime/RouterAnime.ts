import { NextFunction, Request, Response, Router } from 'express'
import { ControllerAnime } from './ControllerAnime'
import { querySchemaType, validateQuerySchema } from './Schemas/querySchema'
import { bodySchemaType, validateBodySchema, validatePartialBodySchema } from './Schemas/bodySchema'

export const routerAnime = (): Router => {
  const router = Router()

  const controllerAnime = new ControllerAnime()

  router.get('', async (req: Request, res: Response): Promise<void> => {
    const { status, data } = validateQuerySchema({ queryParams: req.query })
    if (!status) {
      res.status(400).json({
        statusCode: 400,
        error: JSON.parse(data as string),
        data: []
      })
      return
    }
    const animeResponse = await controllerAnime.getAll({ input: data as querySchemaType })
    res.status(animeResponse.statusCode).json(animeResponse)
  })

  router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params ?? ''
    try {
      const animeResponse = await controllerAnime.getById({ id })
      res.status(animeResponse.statusCode).json(animeResponse)
    } catch (error) {
      next(error)
    }
  })

  router.post('', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { status, data } = validateBodySchema({ input: req.body })
    if (!status) {
      res.status(400).json({
        statusCode: 400,
        error: JSON.parse(data as string),
        data: []
      })
      return
    }

    try {
      const animeResponse = await controllerAnime.create({ input: (data as bodySchemaType) })
      res.status(animeResponse.statusCode).json(animeResponse)
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params ?? ''

    const { status, data } = validatePartialBodySchema({ input: req.body })
    if (!status) {
      res.status(400).json({
        statusCode: 400,
        error: JSON.parse(data as string),
        data: []
      })
      return
    }

    try {
      const animeResponse = await controllerAnime.update({ input: (data as bodySchemaType), id })
      res.status(animeResponse.statusCode).json(animeResponse)
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params ?? ''

    try {
      const animeResponse = await controllerAnime.delete({ id })
      res.status(animeResponse.statusCode).json(animeResponse)
    } catch (error) {
      next(error)
    }
  })

  return router
}
