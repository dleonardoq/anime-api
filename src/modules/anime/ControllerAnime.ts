import { returnType } from '../../Common/Interface'
import { ModelAnime } from './ModelAnime'
import { bodySchemaType } from './Schemas/bodySchema'
import { querySchemaType } from './Schemas/querySchema'

export class ControllerAnime {
  constructor (private readonly modelAnime = new ModelAnime()) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<returnType> => {
    return await this.modelAnime.getAll({ input })
  }

  getById = async ({ id }: { id: string }): Promise<returnType> => {
    return await this.modelAnime.getById({ id })
  }

  create = async ({ input }: { input: bodySchemaType }): Promise<returnType> => {
    return await this.modelAnime.create({ input })
  }
}
