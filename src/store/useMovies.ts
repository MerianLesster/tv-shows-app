import { computed, ref } from 'vue'
import type { IMovie, IGenres } from '@/types/index.ts'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

const genreTypes: IGenres[] = ['Thriller', 'Horror', 'Romance', 'Action']

export const useMovies = defineStore('useMovies', () => {
  const toast = useToast()
  const movies = ref<IMovie[]>([])

  // Compute genres dynamically from movies
  const genres = computed<{ type: IGenres; movies: IMovie[] }[]>(() => {
    if (!movies.value.length) return []

    return genreTypes.map((genre: IGenres) => {
      const filteredMovies = movies.value
        .filter((movie) => movie.genres.includes(genre))
        .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
      return {
        type: genre,
        movies: filteredMovies.map((movie) => ({
          ...movie,
          isFavorite: movie.isFavorite ?? false,
        })),
      }
    })
  })

  const favoriteGenres = ref<{ type: IGenres; movies: IMovie[] }[]>([])

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows')
      if (!response.ok) throw new Error('Network response was not ok')
      const jsonData: IMovie[] = await response.json()
      // Add isFavorite property to each movie
      // Limit to first 70 movies for performance
      movies.value = jsonData.slice(0, 70).map((movie) => ({ ...movie, isFavorite: false }))
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchShowDetails = async (id: number): Promise<IMovie | null> => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const jsonData: IMovie = await response.json()
      return jsonData
    } catch (error) {
      console.error('Error fetching show details:', error)
    }
    return null
  }

  const addOrRemoveFavorites = (movie: IMovie) => {
    const updatedMovies = movies.value.map((m) =>
      m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m,
    )
    movies.value = updatedMovies

    const isFavorited = !movie.isFavorite
    toast.add({
      severity: isFavorited ? 'success' : 'info',
      summary: isFavorited ? 'Added' : 'Removed',
      detail: `${movie.name} ${isFavorited ? 'added to' : 'removed from'} favorites!`,
      life: 2000,
    })
  }

  const showFavorites = () => {
    favoriteGenres.value = genres.value
      .map((genre) => ({
        type: genre.type,
        movies: genre.movies.filter((movie) => movie.isFavorite),
      }))
      .filter((genre) => genre.movies.length > 0)

    return favoriteGenres.value
  }

  const searchMovies = async (query: string) => {
    if (!query) {
      movies.value = []
      await fetchMovies()
      return
    }

    const lowerCaseQuery = query.toLowerCase()
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${lowerCaseQuery}`)
      if (!response.ok) throw new Error('Network response was not ok')
      const jsonData = await response.json()

      // Keep isFavorite flag when updating movies
      movies.value = jsonData.map((item: { show: IMovie; score: number }) => ({
        ...item.show,
        isFavorite: movies.value.find((m) => m.id === item.show.id)?.isFavorite ?? false,
      }))
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  return {
    fetchMovies,
    movies,
    genres,
    favoriteGenres,
    addOrRemoveFavorites,
    showFavorites,
    searchMovies,
    fetchShowDetails,
  }
})
