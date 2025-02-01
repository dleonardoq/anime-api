import z from 'zod'
import { animeCategory, animeGenre, animeStatus, animeType } from '../Interfaces'

const bodySchema = z.object({
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

/*
  Validate request data without an UUID property it's gonna be created by default
  just to request
*/
type bodySchemaTypeNoUUID = z.infer<typeof bodySchema>
type arrayBodySchemaTypeNoUUID = z.infer<typeof arrayBodySchema>

/*
  To response with the whole data including UUID
*/

const bodySchemaWithUUID = bodySchema.extend({
  uuid: z.string()
})

const arrayBodySchemaWithUUID = z.array(bodySchemaWithUUID)

export type bodySchemaType = z.infer<typeof bodySchemaWithUUID>
export type arrayBodySchemaType = z.infer<typeof arrayBodySchemaWithUUID>

interface validateBodySchemaReturn {
  status: boolean
  data: bodySchemaTypeNoUUID | Partial<bodySchemaTypeNoUUID> | arrayBodySchemaTypeNoUUID | Partial<arrayBodySchemaTypeNoUUID> | string
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
