import { Anime } from '../modules/anime/Interfaces'

type returnDataType = Anime | Anime[] | []

export interface returnType {
  statusCode: number
  message: string
  data: returnDataType
}
