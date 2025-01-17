import { returnHandler } from '../../Common/ReturnHandler'
import { ModelAnime } from './ModelAnime'
import { querySchemaType } from './Schemas/querySchema'

export class ControllerAnime {
  constructor (private readonly modelAnime = new ModelAnime()) {}

  getAll = async ({ input }: { input: querySchemaType }): Promise<ReturnType<typeof returnHandler>> => {
    return await this.modelAnime.getAll({ input })
  }
}
