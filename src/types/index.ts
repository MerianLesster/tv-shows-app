interface IMovies {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number | null
  }
}
export type { IMovies }
