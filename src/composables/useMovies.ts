import { ref } from 'vue'
import type { IMovies, IGenres } from '@/types/index.ts'

const genreTypes: IGenres[] = ['Thriller', 'Horror', 'Romance', 'Action']
export const useMovies = () => {
  const movies = ref<IMovies[]>([])
  const genres = ref<{ type: IGenres; movies: IMovies[] }[]>([])

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const jsonData: IMovies[] = await response.json()
      // Limit to first 100 movies for brevity
      movies.value = jsonData.slice(0, 100)

      genreTypes.forEach((genre: IGenres) => {
        const filteredMovies = movies.value.filter((movie: IMovies) => movie.genres.includes(genre))
        genres.value.push({ type: genre, movies: filteredMovies })
      })
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  fetchMovies()

  return { fetchMovies, movies, genres }
}
