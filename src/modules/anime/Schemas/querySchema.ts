import z from 'zod'
import { animeCategory, animeGenre, animeStatus, animeType } from '../Interfaces'

const querySchema = z.object({
  genre: z.nativeEnum(animeGenre).optional(),
  type: z.nativeEnum(animeType).optional(),
  category: z.nativeEnum(animeCategory).optional(),
  status: z.nativeEnum(animeStatus).optional(),
  name: z.string().optional()
}).strict()

export type querySchemaType = z.infer<typeof querySchema>
interface validateSchemaReturn {
  status: boolean
  data: querySchemaType | string
}

export const validateQuerySchema = ({ queryParams }: { queryParams: any }): validateSchemaReturn => {
  const response = querySchema.safeParse(queryParams)
  if (response.error != null) {
    return {
      status: false,
      data: response.error.message
    }
  }

  return {
    status: true,
    data: response.data
  }
}
