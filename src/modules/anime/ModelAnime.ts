import { returnHandler } from '../../Common/ReturnHandler'
import animesJson from './animesJson.json'
import { Anime, animeCategory, animeGenre, animeStatus, animeType } from './Interfaces'

export class ModelAnime {
  constructor (private readonly animesResponse: Anime[] = animesJson.map(anime => ({
    ...anime,
    date: new Date(anime.date),
    genre: anime.genre as animeGenre,
    type: anime.type as animeType,
    category: anime.category as animeCategory,
    status: anime.status as animeStatus
  }))) {}

  getAll = async (): Promise<ReturnType<typeof returnHandler>> => {
    return returnHandler({ statusCode: 200, message: 'OK', data: this.animesResponse })
  }
}
