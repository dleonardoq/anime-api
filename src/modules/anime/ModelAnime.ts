import { returnType } from '../../Common/Interface'
import animesJson from './animesJson.json'
import { Anime, animeCategory, animeGenre, animeStatus, animeType } from './Interfaces'
import { querySchemaType } from './Schemas/querySchema'

export class ModelAnime {
  constructor (private readonly animesResponse: Anime[] = animesJson.map(anime => ({
    ...anime,
    date: new Date(anime.date),
    genre: anime.genre as animeGenre,
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

    const filteredAnimes = this.animesResponse.filter(anime => {
      const genre = anime.genre.toLocaleLowerCase()
      const type = anime.type.toLocaleLowerCase()
      const category = anime.category.toLocaleLowerCase()
      const status = anime.status.toLocaleLowerCase()
      const name = anime.name.toLocaleLowerCase()

      return (
        (!input.genre || genre === input.genre.toLocaleLowerCase()) &&
        (!input.type || type === input.type.toLocaleLowerCase()) &&
        (!input.category || category === input.category.toLocaleLowerCase()) &&
        (!input.status || status === input.status.toLocaleLowerCase()) &&
        (input.name === undefined || name.includes(input.name.toLocaleLowerCase()))
      )
    })

    if (filteredAnimes.length <= 0) {
      return { statusCode: 404, message: 'Movies not Found', data: [] }
    }

    return { statusCode: 200, message: 'OK', data: filteredAnimes }
  }
}
