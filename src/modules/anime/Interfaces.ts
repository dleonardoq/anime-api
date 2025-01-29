export enum animeStatus {
  on_air = 'onair',
  finished = 'finished',
  brand_new = 'brandnew'
}

export enum animeGenre {
  Action = 'action',
  Adventure = 'adventure',
  Comedy = 'comedy',
  Mistery = 'mistery',
  Drama = 'drama',
  Ecchi = 'ecchi',
  Fantasy = 'fantasy',
  History = 'history',
  Magic = 'magic',
  Mecha = 'mecha',
  Music = 'music',
  Romance = 'romance',
  School = 'school',
  Sci_Fi = 'sci-Fi',
  Sports = 'sports',
  Yaoi = 'yaoi',
  Yuri = 'yuri',
  Harem = 'harem',
  Psycologic = 'psycologic',
  Thriller = 'thriller',
  Isekai = 'isekai'
}

export enum animeType {
  Anime = 'anime',
  Movie = 'movie',
  Specials = 'specials',
  Ova = 'ova',
  Ona = 'ona'
}

export enum animeCategory {
  Anime = 'anime',
  Donghua = 'donghua'
}

export interface Anime {
  uuid: string
  name: string
  description: string
  caps: number
  date: Date
  image: string
  genre: animeGenre[]
  type: animeType
  category: animeCategory
  status: animeStatus
}
