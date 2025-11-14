import { ref } from 'vue'
import type { IMovies, IGenres } from '@/types/index.ts'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

const genreTypes: IGenres[] = ['Thriller', 'Horror', 'Romance', 'Action']
export const useMovies = defineStore('useMovies', () => {
  const toast = useToast()

  const movies = ref<IMovies[]>([])
  const genres = ref<{ type: IGenres; movies: IMovies[] }[]>([])
  const favoriteGenres = ref<{ type: IGenres; movies: IMovies[] }[]>([])

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

  const addOrRemoveFavorites = (movie: IMovies) => {
    const isFavorited = movie.isFavorite
    if (isFavorited) {
      toast.add({
        severity: 'info',
        summary: 'Removed',
        detail: `${movie.name} removed from favorites!`,
        life: 2000,
      })
    } else {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `${movie.name} added to favorites!`,
        life: 2000,
      })
    }
    genres.value.forEach((genre) => {
      genre.movies = genre.movies.map((m) =>
        m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m,
      )
    })
  }

  const showFavorites = () => {
    favoriteGenres.value = genres.value.map((genre) => ({
      type: genre.type,
      movies: genre.movies.filter((movie) => movie.isFavorite),
    }))
    return favoriteGenres.value
  }

  return { fetchMovies, movies, genres, favoriteGenres, addOrRemoveFavorites, showFavorites }
})
