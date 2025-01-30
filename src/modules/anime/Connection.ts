import mongoose from 'mongoose'
import { envs } from '../../Common/globalVariables'

const url = `mongodb://${envs.dbUser}:${envs.dbPassword}@${envs.dbHost}:${envs.dbPort}/${envs.dbName}?authSource=${envs.dbName}`

export const dbConection = async (): Promise<void> => {
  try {
    await mongoose.connect(url)
    console.log('Mongo conection succesfull')
  } catch (error) {
    console.log('Error when connecting to mongo db: ', error)
  }
}
