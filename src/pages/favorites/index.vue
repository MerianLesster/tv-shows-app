<template>
  <div>
    <Header
      title="Favorites"
      description="Your saved shows live here. Revisit your favorites anytime and pick up right where you left off."
    />
    <template v-for="genre in favoriteGenres" :key="genre.type">
      <div class="p-5">
        <p class="text-2xl mb-3 text-primary font-extrabold">{{ genre.type }}</p>
        <Carousel :movies="genre.movies" />
      </div>
    </template>
    <div v-if="favoriteGenres.length === 0">
      <p class="text-center text-primary font-bold mt-12 italic">No favorites added yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Header from '@/components/Header.vue'
import { useMovies } from '@/store/useMovies'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

const { showFavorites } = useMovies()
const { favoriteGenres } = storeToRefs(useMovies())

watchEffect(() => {
  showFavorites()
})
</script>
