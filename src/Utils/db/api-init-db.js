/* eslint-disable no-undef */
db = db.getSiblingDB('anime')
db.createUser({
  user: 'tsmroot',
  pwd: 'toormst',
  roles: [{ role: 'readWrite', db: 'anime' }]
})
db.createCollection('anime_collection')
