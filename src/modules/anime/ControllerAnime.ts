import { AnimeNoUUID, returnType } from '@anime/Interfaces'
import { ModelAnime } from '@anime/ModelAnime'
import { querySchemaType } from '@anime/Schemas/querySchema'

export class ControllerAnime {
  constructor (private readonly modelAnime = new ModelAnime()) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<returnType> => {
    return await this.modelAnime.getAll({ input })
  }

  getById = async ({ id }: { id: string }): Promise<returnType> => {
    return await this.modelAnime.getById({ id })
  }

  create = async ({ input }: { input: AnimeNoUUID | AnimeNoUUID[] }): Promise<returnType> => {
    return await this.modelAnime.create({ input })
  }

  update = async ({ input, id }: { input: AnimeNoUUID, id: string }): Promise<returnType> => {
    return await this.modelAnime.update({ input, id })
  }

  delete = async ({ id }: { id: string }): Promise<returnType> => {
    return await this.modelAnime.delete({ id })
  }
}
