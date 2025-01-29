/* eslint-disable no-undef */
db = db.getSiblingDB('anime')
db.createUser({
  user: 'anmroot',
  pwd: 'toormna',
  roles: [{ role: 'readWrite', db: 'anime' }]
})
db.createCollection('anime_collection')
