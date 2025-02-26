import { PersonalizedError } from '@common/PersonalizedError'
import { AnimeNoUUID, returnDataType, returnType } from '@anime/Interfaces'
import { AnimeModelMongo } from '@anime/Schemas/dbMongooseSchema'
import { querySchemaType } from '@anime/Schemas/querySchema'
import { logger } from '@common/Logger'

export class ModelAnime {
  constructor (private readonly mongooseModel = AnimeModelMongo) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<returnType> => {
    // TODO: filter by name ********

    if (
      input.genre === undefined &&
      input.category === undefined &&
      input.type === undefined &&
      input.status === undefined &&
      input.name === undefined
    ) {
      try {
        const animes = await this.mongooseModel.find({}, { _id: 0, __v: 0 })
        if (animes.length === 0) {
          throw new PersonalizedError('Not animes found', 404)
        }
        return { statusCode: 200, message: 'OK', data: animes }
      } catch (error) {
        let message = 'Internal server error'
        let statusCode = 500

        if (error instanceof PersonalizedError) {
          message = error.message ?? message
          statusCode = error.getStatusCode() ?? statusCode
        } else if (error instanceof Error) {
          logger.error({ message: error })
        }

        throw new PersonalizedError(message, statusCode)
      }
    }

    try {
      const animes = await this.mongooseModel.find(input, { _id: 0, __v: 0 })
      if (animes.length === 0) {
        throw new PersonalizedError('Not animes found by filters', 404)
      }
      return { statusCode: 200, message: 'OK', data: animes }
    } catch (error) {
      let message = 'Internal server error'
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? message
        statusCode = error.getStatusCode() ?? statusCode
      } else if (error instanceof Error) {
        logger.error({ message: error })
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  getById = async ({ id }: { id: string }): Promise<returnType> => {
    try {
      const animeById = await this.mongooseModel.findOne({ uuid: id }, { _id: 0, __v: 0 })
      if (animeById == null) {
        throw new PersonalizedError('Anime not found', 404)
      }
      return {
        statusCode: 200,
        message: 'OK',
        data: animeById as returnDataType
      }
    } catch (error: unknown) {
      let message = 'Internal server error'
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? message
        statusCode = error.getStatusCode() ?? statusCode
      } else if (error instanceof Error) {
        logger.error({ message: error })
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  create = async ({ input }: { input: AnimeNoUUID | AnimeNoUUID[] }): Promise<returnType> => {
    try {
      const createdAnime = await this.mongooseModel.create(input)

      return {
        statusCode: 200,
        message: 'Anime created',
        data: createdAnime
      }
    } catch (error) {
      let message = 'Internal server error'
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? message
        statusCode = error.getStatusCode() ?? statusCode
      } else if (error instanceof Error) {
        logger.error({ message: error })
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  update = async ({ input, id }: { input: AnimeNoUUID, id: string }): Promise<returnType> => {
    try {
      const updatedAnime = await this.mongooseModel.findOneAndUpdate({ uuid: id }, input, { new: true })

      if (updatedAnime == null) {
        throw new PersonalizedError('Anime not found', 404)
      }

      return {
        statusCode: 200,
        message: 'Anime updated',
        data: updatedAnime as returnDataType
      }
    } catch (error) {
      let message = 'Internal server error'
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? message
        statusCode = error.getStatusCode() ?? statusCode
      } else if (error instanceof Error) {
        logger.error({ message: error })
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  delete = async ({ id }: { id: string }): Promise<returnType> => {
    try {
      const deletedAnime = await this.mongooseModel.findOneAndDelete({ uuid: id })

      if (deletedAnime == null) {
        throw new PersonalizedError('Anime not found', 404)
      }

      return {
        statusCode: 200,
        message: 'Anime deleted',
        data: deletedAnime as returnDataType
      }
    } catch (error) {
      let message = 'Internal server error'
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? message
        statusCode = error.getStatusCode() ?? statusCode
      } else if (error instanceof Error) {
        logger.error({ message: error })
      }

      throw new PersonalizedError(message, statusCode)
    }
  }
}
