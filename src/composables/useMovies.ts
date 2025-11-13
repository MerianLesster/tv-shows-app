import { ref } from 'vue'

export const useMovies = () => {
  const movies = ref([])

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const jsonData = await response.json()
      // Limit to first 10 movies for brevity
      movies.value = jsonData.slice(0, 10)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  fetchMovies()

  return { fetchMovies, movies }
}
