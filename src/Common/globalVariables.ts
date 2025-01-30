import z from 'zod'

interface EnvVars {
  DB_NAME: string
  DB_COLLECTION: string
  DB_USER: string
  DB_PASSWORD: string
  DB_HOST: string
  DB_PORT: string
}

const envSchema = z
  .object({
    DB_NAME: z.string(),
    DB_COLLECTION: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.string()
  })

const response = envSchema.safeParse(process.env)

if (response.error != null) {
  throw new Error(`Config validation error ${response.error.message}`)
}

const envVars: EnvVars = response.data

export const envs = {
  dbName: envVars.DB_NAME,
  dbCollection: envVars.DB_COLLECTION,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT
}
