import { returnHandler } from '../../Common/ReturnHandler'
import { ModelAnime } from './ModelAnime'

export class ControllerAnime {
  constructor (private readonly modelAnime = new ModelAnime()) {}

  getAll = async (): Promise<ReturnType<typeof returnHandler>> => {
    return await this.modelAnime.getAll()
  }
}
