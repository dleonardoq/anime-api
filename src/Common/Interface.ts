import { Anime } from '../modules/anime/Interfaces'

export type returnDataType = Anime | Anime[] | []

export interface returnType {
  statusCode: number
  message: string
  data: returnDataType
}
