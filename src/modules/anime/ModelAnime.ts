import { returnDataType, returnType } from '../../Common/Interface'
import { PersonalizedError } from '../../Common/PersonalizedError'
import { bodySchemaType } from './Schemas/bodySchema'
import { AnimeModelMongo } from './Schemas/mongoSchema'
import { querySchemaType } from './Schemas/querySchema'

export class ModelAnime {
  constructor (private readonly mongooseModel = AnimeModelMongo) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<returnType> => {
    if (
      input.genre === undefined &&
      input.category === undefined &&
      input.type === undefined &&
      input.status === undefined &&
      input.name === undefined
    ) {
      return { statusCode: 200, message: 'OK', data: [] }
    }

    // TODO: customize filter by genre to not do this filter below if these query params are not set

    // const filteredAnimes = await [...this.animesResponse].filter(anime => {
    //   const type = anime.type.toLocaleLowerCase()
    //   const category = anime.category.toLocaleLowerCase()
    //   const status = anime.status.toLocaleLowerCase()
    //   const name = anime.name.toLocaleLowerCase()

    //   return (
    //     (!input.type || type === input.type.toLocaleLowerCase()) &&
    //     (!input.category || category === input.category.toLocaleLowerCase()) &&
    //     (!input.status || status === input.status.toLocaleLowerCase()) &&
    //     (input.name === undefined || name.includes(input.name.toLocaleLowerCase()))
    //   )
    // })

    // if (filteredAnimes.length <= 0 && !input.genre) {
    //   return { statusCode: 404, message: 'Movies not Found', data: [] }
    // }

    // const arrayToValidate = filteredAnimes.length > 0 ? [...filteredAnimes] : [...this.animesResponse]

    // const filteredByGenre = arrayToValidate.filter(anime => (
    //   anime.genre.some(g => g.toLocaleLowerCase() === input.genre?.toLocaleLowerCase())
    // ))

    // if (filteredByGenre.length <= 0) {
    //   return { statusCode: 404, message: 'Movies not Found', data: [] }
    // }

    return { statusCode: 200, message: 'OK', data: [] }
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
      let message = ''
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? 'Internal server error'
        statusCode = error.getStatusCode() ?? 500
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  create = async ({ input }: { input: bodySchemaType }): Promise<returnType> => {
    try {
      const newAnime = { ...input }
      await this.mongooseModel.create(newAnime)

      return {
        statusCode: 200,
        message: 'Anime created',
        data: newAnime
      }
    } catch (error) {
      let message = ''
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? 'Internal server error'
        statusCode = error.getStatusCode() ?? 500
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  update = async ({ input, id }: { input: bodySchemaType, id: string }): Promise<returnType> => {
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
      let message = ''
      let statusCode = 500

      if (error instanceof PersonalizedError) {
        message = error.message ?? 'Internal server error'
        statusCode = error.getStatusCode() ?? 500
      }

      throw new PersonalizedError(message, statusCode)
    }
  }

  delete = async ({ id }: { id: string }): Promise<returnType> => {
    const deletedAnime = await this.mongooseModel.findByIdAndDelete({ uuid: id })

    if (deletedAnime == null) {
      throw new PersonalizedError('Error', 500)
    }

    return {
      statusCode: 200,
      message: 'Anime deleted',
      data: []
    }
  }
}
