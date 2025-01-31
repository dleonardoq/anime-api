import z from 'zod'
import { animeCategory, animeGenre, animeStatus, animeType } from '../Interfaces'

const bodySchema = z.object({
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  caps: z.number().min(1),
  date: z.preprocess((arg) => {
    if (typeof arg === 'string' || typeof arg === 'number') {
      const parsedDate = new Date(arg)
      return isNaN(parsedDate.getTime()) ? undefined : parsedDate
    }
    return arg
  }, z.date()),
  image: z.string().url(),
  genre: z.array(
    z.nativeEnum(animeGenre)
  ),
  type: z.nativeEnum(animeType),
  category: z.nativeEnum(animeCategory),
  status: z.nativeEnum(animeStatus)
}).strict()

const arrayBodySchema = z.array(bodySchema)

export type bodySchemaType = z.infer<typeof bodySchema>
export type arrayBodySchemaType = z.infer<typeof arrayBodySchema>
interface validateBodySchemaReturn {
  status: boolean
  data: bodySchemaType | Partial<bodySchemaType> | arrayBodySchemaType | Partial<arrayBodySchemaType> | string
}

export const validateBodySchema = ({ input }: { input: any }): validateBodySchemaReturn => {
  let response
  if (Array.isArray(input)) {
    response = arrayBodySchema.safeParse(input)
  } else {
    response = bodySchema.safeParse(input)
  }
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

export const validatePartialBodySchema = ({ input }: { input: any }): validateBodySchemaReturn => {
  const response = bodySchema.partial().safeParse(input)
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
