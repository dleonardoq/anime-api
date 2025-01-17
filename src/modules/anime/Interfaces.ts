export enum animeStatus {
  on_air = 'on air',
  finished = 'finished',
  brand_new = 'brand new'
}

export enum animeGenre {
  action = 'action',
  Adventure = 'adventure',
  Comedy = 'Comedy',
  Mistery = 'Mistery',
  Drama = 'Drama',
  Ecchi = 'Ecchi',
  Fantasy = 'Fantasy',
  History = 'History',
  Magic = 'Magic',
  Mecha = 'Mecha',
  Music = 'Music',
  Romance = 'Romance',
  School = 'School',
  Sci_Fi = 'Sci-Fi',
  Sports = 'Sports',
  Yaoi = 'Yaoi',
  Yuri = 'Yuri',
  Harem = 'Harem',
  Psycologic = 'Psycologic',
  Thriller = 'Thriller',
  Isekai = 'Isekai'
}

export enum animeType {
  Anime = 'Anime',
  Movie = 'Movie',
  Specials = 'Specials',
  Ova = 'Ova',
  Ona = 'Ona'
}

export enum animeCategory {
  Anime = 'Anime',
  Donghua = 'Donghua'
}

export interface Anime {
  name: string
  description: string
  caps: number
  date: Date
  image: string
  genre: animeGenre
  type: animeType
  category: animeCategory
  status: animeStatus
}
