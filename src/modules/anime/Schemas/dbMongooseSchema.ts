import { Schema, model } from 'mongoose'
import { envs } from '@common/GlobalVariables'
import { Anime, animeCategory, animeGenre, animeStatus, animeType } from '@anime/Interfaces'
import { randomUUID } from 'crypto'

interface IAnime extends Anime, Document {}

const animeSchemaMongo = new Schema<IAnime>({
  uuid: {
    type: String,
    unique: true,
    default: randomUUID
  },
  name: String,
  description: String,
  caps: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: String,
  genre: {
    type: [String],
    required: true,
    enum: Object.values(animeGenre)
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(animeType)
  },
  category: {
    type: String,
    required: true,
    enum: Object.values(animeCategory)
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(animeStatus)
  }
})

export const AnimeModelMongo = model<IAnime>('anime', animeSchemaMongo, envs.dbCollection)
