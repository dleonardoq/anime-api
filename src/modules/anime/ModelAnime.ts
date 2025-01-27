import { returnType } from '../../Common/Interface'
import animesJson from './animesJson.json'
import { Anime, animeCategory, animeGenre, animeStatus, animeType } from './Interfaces'
import { bodySchemaType } from './Schemas/bodySchema'
import { querySchemaType } from './Schemas/querySchema'

export class ModelAnime {
  constructor (private readonly animesResponse: Anime[] = animesJson.map(anime => ({
    ...anime,
    date: new Date(anime.date),
    genre: anime.genre as animeGenre[],
    type: anime.type as animeType,
    category: anime.category as animeCategory,
    status: anime.status as animeStatus
  }))) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<returnType> => {
    if (
      input.genre === undefined &&
      input.category === undefined &&
      input.type === undefined &&
      input.status === undefined &&
      input.name === undefined
    ) {
      return { statusCode: 200, message: 'OK', data: this.animesResponse }
    }

    // TODO: customize filter by genre to not do this filter below if these query params are not set

    const filteredAnimes = await [...this.animesResponse].filter(anime => {
      const type = anime.type.toLocaleLowerCase()
      const category = anime.category.toLocaleLowerCase()
      const status = anime.status.toLocaleLowerCase()
      const name = anime.name.toLocaleLowerCase()

      return (
        (!input.type || type === input.type.toLocaleLowerCase()) &&
        (!input.category || category === input.category.toLocaleLowerCase()) &&
        (!input.status || status === input.status.toLocaleLowerCase()) &&
        (input.name === undefined || name.includes(input.name.toLocaleLowerCase()))
      )
    })

    if (filteredAnimes.length <= 0 && !input.genre) {
      return { statusCode: 404, message: 'Movies not Found', data: [] }
    }

    const arrayToValidate = filteredAnimes.length > 0 ? [...filteredAnimes] : [...this.animesResponse]

    const filteredByGenre = arrayToValidate.filter(anime => (
      anime.genre.some(g => g.toLocaleLowerCase() === input.genre?.toLocaleLowerCase())
    ))

    if (filteredByGenre.length <= 0) {
      return { statusCode: 404, message: 'Movies not Found', data: [] }
    }

    return { statusCode: 200, message: 'OK', data: filteredByGenre }
  }

  getById = async ({ id }: { id: string }): Promise<returnType> => {
    const animeById = await this.animesResponse.find(anime => anime.uuid === id)
    if (animeById === undefined) {
      return {
        statusCode: 404,
        message: 'Anime not found',
        data: []
      }
    }
    return {
      statusCode: 200,
      message: 'OK',
      data: animeById
    }
  }

  create = async ({ input }: { input: bodySchemaType }): Promise<returnType> => {
    const newAnime = { ...input }
    await this.animesResponse.push(newAnime)
    return {
      statusCode: 200,
      message: 'OK',
      data: newAnime
    }
  }

  update = async ({ input, id }: { input: bodySchemaType, id: string }): Promise<returnType> => {
    const animeId = this.animesResponse.findIndex(anime => anime.uuid === id)

    if (animeId === -1) {
      return {
        statusCode: 404,
        message: 'Anime not found',
        data: []
      }
    }

    const updatedAnime = {
      ...this.animesResponse[animeId],
      ...input
    }

    this.animesResponse[animeId] = updatedAnime

    return {
      statusCode: 200,
      message: 'OK',
      data: updatedAnime
    }
  }
}
