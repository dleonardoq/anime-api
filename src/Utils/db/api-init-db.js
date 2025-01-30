/* eslint-disable no-undef */
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASWWORD
const dbCollection = process.env.DB_COLLECTION

if (!dbName || !dbUser || !dbPass || !dbCollection) {
  throw new Error('Faltan variables de entorno necesarias')
}

db = db.getSiblingDB(dbName)
db.createUser({
  user: dbUser,
  pwd: dbPass,
  roles: [{ role: 'readWrite', db: dbName }]
})
db.createCollection(dbCollection)
