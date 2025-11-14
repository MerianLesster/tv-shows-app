import { ref } from 'vue'
import type { IMovies, IGenres } from '@/types/index.ts'
import { defineStore } from 'pinia'

const genreTypes: IGenres[] = ['Thriller', 'Horror', 'Romance', 'Action']
export const useMovies = defineStore('useMovies', () => {
  const movies = ref<IMovies[]>([])
  const genres = ref<{ type: IGenres; movies: (IMovies & { isFavorite: boolean })[] }[]>([])

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
        const highToLow = filteredMovies.sort(
          (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
        )
        genres.value.push({
          type: genre,
          movies: highToLow.map((movie) => ({ ...movie, isFavorite: false })),
        })
      })
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const addToFavorites = (movieId: number) => {
    genres.value.forEach((genre) => {
      genre.movies = genre.movies.map((movie) =>
        movie.id === movieId ? { ...movie, isFavorite: true } : movie,
      )
    })
  }

  const showFavorites = () => {
    return genres.value.map((genre) => ({
      type: genre.type,
      movies: genre.movies.filter((movie) => movie.isFavorite),
    }))
  }

  return { fetchMovies, movies, genres, addToFavorites, showFavorites }
})
